import React from "react";
import { Container, Heading, Text, Box, Center } from "@chakra-ui/react";

function About() {
    return (
        <Container maxW="container.lg">
            <Center>
                <Box textAlign="center" mt={10}>
                    <Heading as="h1" size="xl" mb={4}>
                        О нас
                    </Heading>
                    <Text fontSize="lg" mb={6}>
                        Мы - магазин премиальных товаров. В нашем магазине вы
                        можете найти только качественноые товары!
                    </Text>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa44ced665ce66d1a06cb86ac2f9f4ce52624e47268e5edb8dd7e17f95c8fa308&amp;source=constructor"
                        width="100%"
                        height="490"
                        frameborder="0"
                    ></iframe>
                </Box>
            </Center>
        </Container>
    );
}

export default About;
