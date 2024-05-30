import React from "react";
import { Button } from "@chakra-ui/react";

function Square({ value, onClick }) {
    return (
        <Button
            onClick={onClick}
            width="60px"
            height="60px"
            fontSize="24px"
            colorScheme="teal"
            variant="outline"
        >
            {value}
        </Button>
    );
}

export default Square;
