const { Sequelize, DataTypes } = require('sequelize');

// Подключение к базе данных
const sequelize = new Sequelize('shop', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Определение модели User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  secretResponse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Определение модели Product
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Определение модели CartItem
const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

// Связи между таблицами
User.hasMany(CartItem);
CartItem.belongsTo(User);
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

// Синхронизация моделей с базой данных
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  User,
  Product,
  CartItem,
  sequelize
};
