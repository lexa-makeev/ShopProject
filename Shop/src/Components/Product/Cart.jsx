import React, { useState, useEffect } from "react";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    let token = localStorage.getItem("token");
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:7000/api/cart",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCartItems(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [token, cartItems]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://127.0.0.1:7000/api/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(
                cartItems.filter((item) => item.ProductId !== productId)
            );
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <VStack spacing="4">
            {cartItems.map((item) => (
                <Box key={item.id} borderWidth="1px" p="4" borderRadius="md">
                    <Text>Наименование: {item.Product.name}</Text>
                    <Text>Цена: {item.Product.price} руб.</Text>
                    <Button
                        color={"red"}
                        onClick={() => handleDelete(item.ProductId)}
                    >
                        Удалить
                    </Button>
                </Box>
            ))}
        </VStack>
    );
}

export default Cart;
