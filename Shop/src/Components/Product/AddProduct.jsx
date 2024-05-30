import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Textarea,
} from "@chakra-ui/react";
import axios from "axios";
function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const addProduct = async () => {
        let token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://127.0.0.1:7000/api/products",
                {
                    name,
                    price,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Product added:", response.data);
            navigate("/products");
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <VStack spacing="4">
            <FormControl id="name">
                <FormLabel>Наименование</FormLabel>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="price">
                <FormLabel>Цена</FormLabel>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </FormControl>
            <FormControl id="description">
                <FormLabel>Описание</FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FormControl>
            <Button colorScheme="blue" onClick={addProduct}>
                Добавить
            </Button>
        </VStack>
    );
}

export default AddProduct;
