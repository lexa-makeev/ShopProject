import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import {
    ChakraProvider,
    Box,
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
    Grid,
    Textarea,
} from "@chakra-ui/react";
import ResetPassword from "./ResetPassword";
import axios from "axios";
function SignIn({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signin = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:7000/api/auth/signin",
                {
                    username,
                    password,
                }
            );
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/products");
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    return (
        <VStack spacing="4">
            <FormControl id="username">
                <FormLabel>Логин</FormLabel>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Пароль</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button colorScheme="green" onClick={signin}>
                Войти
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/signup")}>
                Зарегистрироваться
            </Button>
            <Button
                colorScheme="blue"
                onClick={() => navigate("/reset-password")}
            >
                Забыли пароль?
            </Button>
        </VStack>
    );
}

export default SignIn;
