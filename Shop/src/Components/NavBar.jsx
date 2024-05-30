// src/Components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";

function NavBar({ token, signout }) {
    return (
        <Box bg="teal.500" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box>
                    <Link to="/products">
                        <Button colorScheme="teal" variant="ghost">
                            Продукты
                        </Button>
                    </Link>

                    {token && (
                        <>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    colorScheme="teal"
                                    variant="ghost"
                                >
                                    Сервис
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        <Link to="/add-product">
                                            Добавить продукт
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/users">Пользователи</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/calc">Калькулятор</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/weather">Погода</Link>
                                    </MenuItem>
                                </MenuList>
                            </Menu>{" "}
                        </>
                    )}
                    <Menu>
                        <MenuButton
                            as={Button}
                            colorScheme="teal"
                            variant="ghost"
                        >
                            Игры
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Link to="/tictac">Крестики нолики</Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box>
                    {token ? (
                        <>
                            <Link to="/cart">
                                <Button colorScheme="teal" variant="ghost">
                                    Корзина
                                </Button>
                            </Link>
                            <Button colorScheme="red" onClick={signout}>
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Link to="/signin">
                            <Button colorScheme="teal">Войти</Button>
                        </Link>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export default NavBar;
