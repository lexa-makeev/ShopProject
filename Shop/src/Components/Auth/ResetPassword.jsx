import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";

function ResetPassword() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [secretResponse, setSecretResponse] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const resetPassword = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:7000/api/auth/reset",
                {
                    username,
                    email,
                    secretResponse,
                    password: newPassword,
                }
            );
            console.log("Reset password response:", response.data);
            // Handle success or error messages as needed
        } catch (error) {
            console.error("Error resetting password:", error);
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
            <FormControl id="email">
                <FormLabel>Электронная почта</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="secretResponse">
                <FormLabel>Секретный ответ</FormLabel>
                <Input
                    type="text"
                    value={secretResponse}
                    onChange={(e) => setSecretResponse(e.target.value)}
                />
            </FormControl>
            <FormControl id="newPassword">
                <FormLabel>Новый пароль</FormLabel>
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </FormControl>
            <Button colorScheme="green" onClick={resetPassword}>
                Сбросить пароль
            </Button>
        </VStack>
    );
}

export default ResetPassword;
