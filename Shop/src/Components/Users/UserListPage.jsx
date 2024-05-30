import React, { useState, useEffect } from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import axios from "axios";

function UserListPage() {
    const [users, setUsers] = useState([]);
    let token = localStorage.getItem("token");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:7000/api/auth/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Box>
            <List spacing={3}>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <Text>Логин: {user.username}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Создан: {user.createdAt}</Text>
                        <Text>Обновлен: {user.updatedAt}</Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default UserListPage;
