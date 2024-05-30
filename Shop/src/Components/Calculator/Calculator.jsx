import React, { useState } from "react";
import { evaluate } from "mathjs";
import {
    Box,
    Button,
    Container,
    Grid,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";

function Calculator() {
    const [number, setNumber] = useState("0");
    const [expression, setExpression] = useState("");
    const [nextOp, setNextOp] = useState(false);

    const calculateResult = () => {
        try {
            const result = evaluate(expression + number).toString();
            if (result === "Infinity" || result === "-Infinity") {
                setNumber(number);
                setExpression("");
                setNextOp(true);
            } else {
                setNumber(result);
                setExpression("");
                setNextOp(true);
            }
        } catch (error) {
            setNumber("Error");
        }
    };

    const handleInput = (input) => {
        if (nextOp && !isNaN(input)) {
            setNumber(input.toString());
            setNextOp(false);
            return;
        }

        switch (input) {
            case "sqrt":
                if (number[0] !== "-") {
                    setNumber(
                        evaluate(`sqrt(${number})`).toFixed(8).toString()
                    );
                }
                break;
            case "+/-":
                setNumber(
                    number.startsWith("-") ? number.slice(1) : `-${number}`
                );
                break;
            case ".":
                if (!number.includes(".")) {
                    setNumber(number + ".");
                }
                break;
            default:
                if (!isNaN(input)) {
                    setNumber(
                        number === "0" ? input.toString() : number + input
                    );
                } else {
                    setExpression(expression + number + input);
                    setNumber("0");
                    setNextOp(false);
                }
                break;
        }
    };

    const clearAll = () => {
        setNumber("0");
        setExpression("");
    };

    const deleteLast = () => {
        setNumber(number.length > 1 ? number.slice(0, -1) : "0");
    };

    return (
        <Container>
            <Heading as="h1" mb={4} textAlign="center" marginBottom={"80px"}>
                Калькулятор
            </Heading>
            <Box
                className="App"
                p={5}
                maxWidth="300px"
                mx="auto"
                border="1px solid #ccc"
                borderRadius="xl"
            >
                <VStack spacing={4}>
                    <Text fontSize="2xl" w="100%" textAlign="right">
                        {expression + (nextOp ? "" : number)}
                    </Text>
                    <Text fontSize="3xl" w="100%" textAlign="right">
                        {number}
                    </Text>
                    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                        <Button onClick={() => handleInput("sqrt")}>
                            sqrt
                        </Button>
                        <Button onClick={deleteLast}>DEL</Button>
                        <Button onClick={clearAll}>C</Button>
                        <Button onClick={() => handleInput("/")}>/</Button>
                        <Button onClick={() => handleInput(7)}>7</Button>
                        <Button onClick={() => handleInput(8)}>8</Button>
                        <Button onClick={() => handleInput(9)}>9</Button>
                        <Button onClick={() => handleInput("*")}>x</Button>
                        <Button onClick={() => handleInput(4)}>4</Button>
                        <Button onClick={() => handleInput(5)}>5</Button>
                        <Button onClick={() => handleInput(6)}>6</Button>
                        <Button onClick={() => handleInput("-")}>-</Button>
                        <Button onClick={() => handleInput(1)}>1</Button>
                        <Button onClick={() => handleInput(2)}>2</Button>
                        <Button onClick={() => handleInput(3)}>3</Button>
                        <Button onClick={() => handleInput("+")}>+</Button>
                        <Button onClick={() => handleInput("+/-")}>+/-</Button>
                        <Button onClick={() => handleInput(0)}>0</Button>
                        <Button onClick={() => handleInput(".")}>.</Button>
                        <Button onClick={calculateResult}>=</Button>
                    </Grid>
                </VStack>
            </Box>
        </Container>
    );
}

export default Calculator;
