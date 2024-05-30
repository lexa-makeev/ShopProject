import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Square from "./Square";

function Board({ squares, onClick }) {
    return (
        <Box>
            {[0, 3, 6].map((row) => (
                <Flex key={row}>
                    {[0, 1, 2].map((col) => (
                        <Square
                            key={row + col}
                            value={squares[row + col]}
                            onClick={() => onClick(row + col)}
                        />
                    ))}
                </Flex>
            ))}
        </Box>
    );
}

export default Board;
