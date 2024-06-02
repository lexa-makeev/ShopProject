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
    useDisclosure,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function NavBar({ token, signout }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <Box bg="teal.500" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box
                    display={{ base: "flex", md: "none" }}
                    ref={btnRef}
                    onClick={onOpen}
                >
                    <IconButton
                        icon={<HamburgerIcon />}
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Open Menu"
                    />
                </Box>
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Меню</DrawerHeader>
                            <DrawerBody>
                                <Link to="/products">
                                    <Button
                                        w="100%"
                                        colorScheme="teal"
                                        variant="ghost"
                                        onClick={onClose}
                                    >
                                        Продукты
                                    </Button>
                                </Link>
                                {token && (
                                    <>
                                        <Link to="/add-product">
                                            <Button
                                                w="100%"
                                                colorScheme="teal"
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Добавить продукт
                                            </Button>
                                        </Link>
                                        <Link to="/users">
                                            <Button
                                                w="100%"
                                                colorScheme="teal"
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Пользователи
                                            </Button>
                                        </Link>
                                        <Link to="/calc">
                                            <Button
                                                w="100%"
                                                colorScheme="teal"
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Калькулятор
                                            </Button>
                                        </Link>
                                        <Link to="/weather">
                                            <Button
                                                w="100%"
                                                colorScheme="teal"
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Погода
                                            </Button>
                                        </Link>
                                        <Link to="/todo">
                                            <Button
                                                w="100%"
                                                colorScheme="teal"
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Мои задачи
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                <Link to="/tictac">
                                    <Button
                                        w="100%"
                                        colorScheme="teal"
                                        variant="ghost"
                                        onClick={onClose}
                                    >
                                        Крестики нолики
                                    </Button>
                                </Link>
                                {token && (
                                    <Link to="/cart">
                                        <Button
                                            w="100%"
                                            colorScheme="teal"
                                            variant="ghost"
                                            onClick={onClose}
                                        >
                                            Корзина
                                        </Button>
                                    </Link>
                                )}
                                <Link to="/about">
                                    <Button
                                        w="100%"
                                        colorScheme="teal"
                                        variant="ghost"
                                    >
                                        О нас
                                    </Button>
                                </Link>
                            </DrawerBody>
                            <DrawerFooter>
                                {token ? (
                                    <Button
                                        colorScheme="red"
                                        w="100%"
                                        onClick={signout}
                                    >
                                        Выйти
                                    </Button>
                                ) : (
                                    <Link to="/signin">
                                        <Button
                                            colorScheme="teal"
                                            w="100%"
                                            onClick={onClose}
                                        >
                                            Войти
                                        </Button>
                                    </Link>
                                )}
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
                <Box display={{ base: "none", md: "flex" }}>
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
                            </Menu>
                            <Link to="/todo">
                                <Button colorScheme="teal" variant="ghost">
                                    Мои задачи
                                </Button>
                            </Link>
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
                    <Link to="/about">
                        <Button colorScheme="teal" variant="ghost">
                            О нас
                        </Button>
                    </Link>
                </Box>
                <Box display={{ base: "none", md: "flex" }}>
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
