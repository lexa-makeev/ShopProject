import React, { useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secretResponse, setSecretResponse] = useState("");
    const navigate = useNavigate();

    const signup = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:7000/api/auth/signup",
                {
                    email,
                    username,
                    password,
                    secretResponse,
                }
            );
            console.log("User signed up:", response.data);
            navigate("/signin");
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup();
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing="4">
                <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl id="username">
                    <FormLabel>Логин</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Пароль</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl id="secret">
                    <FormLabel>Кодовое слово</FormLabel>
                    <Input
                        type="password"
                        value={secretResponse}
                        onChange={(e) => setSecretResponse(e.target.value)}
                        required
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Зарегистрироваться
                </Button>
            </VStack>
        </form>
    );
}

export default SignUp;
