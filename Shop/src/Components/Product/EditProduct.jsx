import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";
import axios from "axios";

function EditProduct() {
    let token = localStorage.getItem("token");
    const { productId } = useParams();
    const history = useNavigate();
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:7000/api/products/${productId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProductData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://127.0.0.1:7000/api/products/${productId}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Product updated:", response.data);
            history("/products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Heading as="h1" mb={4} textAlign="center" marginBottom={"80px"}>
                Редактировать продукт
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" mb={4}>
                    <FormLabel>Наименование</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl id="price" mb={4}>
                    <FormLabel>Цена</FormLabel>
                    <Input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl id="description" mb={4}>
                    <FormLabel>Описание</FormLabel>
                    <Input
                        type="text"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" width={"100%"}>
                    Сохранить
                </Button>
            </form>
        </Box>
    );
}

export default EditProduct;
