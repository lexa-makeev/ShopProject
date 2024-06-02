import React from "react";
import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import TaskBlock from "./TaskBlock";

function Tasks({ data, changer }) {
    return (
        <Container paddingTop="5" color="white" maxW="100%">
            {data && data.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
                    {data.map((e, index) => (
                        <TaskBlock key={index} info={e} flagState={changer} />
                    ))}
                </SimpleGrid>
            ) : (
                <Text color="gray" w="100%" textAlign="center" fontSize="4xl">
                    Пока нет задач
                </Text>
            )}
        </Container>
    );
}

export default Tasks;
