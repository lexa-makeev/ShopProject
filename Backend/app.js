const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Product, CartItem, sequelize } = require("./db");
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");
const app = express();
const host = "127.0.0.1";
const port = 7000;
const tokenKey = "ba21-dc43-fe65-hg87";

const TelegramBot = require("node-telegram-bot-api");

const botToken = "secret";
const chatId = "secret";
const bot = new TelegramBot(botToken);

app.use(express.json());
const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
///////////////////////////////////////////////////////////////////////////
//                                                                       //
// Функция промежуточной обработки, монтируемая в путь /api/auth         //
// Эта функция выполняется для всех типов запросов HTTP в пути /api/auth //
//                                                                       //
///////////////////////////////////////////////////////////////////////////

function generateToken(id) {
    return jwt.sign({ id }, tokenKey);
}

// Middleware для аутентификации
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, tokenKey);
            const user = await User.findByPk(payload.id);
            if (user) {
                req.user = user;
                return next();
            }
        } catch (err) {
            console.log(err);
        }
    }
    return res.status(401).json({ error: "Unauthorized" });
};

// Регистрация пользователя
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { username, password, email, secretResponse } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User with this username or email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            secretResponse,
            token: generateToken(),
        });
        res.status(200).json({ id: user.id, token: user.token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Авторизация пользователя
app.post("/api/auth/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = generateToken(user.id);
                await user.update({ token });
                res.status(200).json({ id: user.id, token });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Проверка токена
app.get("/api/auth/check", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, tokenKey);
            const user = await User.findByPk(payload.id);
            if (user) {
                res.status(200).json({ id: user.id, token: "Valid token" });
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        } catch (err) {
            console.log(err);
            res.status(401).json({ error: "Unauthorized" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// Добавление продукта
app.post("/api/products", authenticateToken, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = await Product.create({ name, price, description });
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Получение всех продуктов
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Добавление товара в корзину
app.post("/api/cart", authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const username = user.username;

        const cartItem = await CartItem.create({
            UserId: req.user.id,
            ProductId: productId,
            quantity,
        });

        bot.sendMessage(
            chatId,
            `Пользователь ${username} добавил товар "${product.name}" в корзину.`
        );

        res.status(201).json(cartItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Получение товаров из корзины
app.get("/api/cart", authenticateToken, async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            where: { UserId: req.user.id },
            include: Product,
        });
        res.status(200).json(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Удаление товара из корзины
app.delete("/api/cart/:productId", authenticateToken, async (req, res) => {
    try {
        const productId = req.params.productId;

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const username = user.username;

        const cartItem = await CartItem.findOne({
            where: { UserId: req.user.id, ProductId: productId },
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        await cartItem.destroy();

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        bot.sendMessage(
            chatId,
            `Пользователь ${username} удалил товар "${product.name}" из корзины.`
        );

        return res
            .status(200)
            .json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//////////////////////////////////////////////////////////
app.get("/api/auth/users", authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

////////////////////////////////////////////////////////////////////////
app.post("/api/auth/reset", async (req, res) => {
    try {
        const { username, email, secretResponse, password } = req.body;
        const user = await User.findOne({
            where: { username, email, secretResponse },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found or secret response is incorrect",
            });
        }

        // Хэшируем новый пароль перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Редактирование товара
app.put("/api/products/:productId", authenticateToken, async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, price, description } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (name) product.name = name;
        if (price) product.price = price;
        if (description) product.description = description;

        await product.save();

        return res
            .status(200)
            .json({ message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Получение конкретного товара по его идентификатору
app.get("/api/products/:productId", authenticateToken, async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Удаление товара
app.delete("/api/products/:productId", authenticateToken, async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.destroy();

        return res
            .status(200)
            .json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Запуск сервера
app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
