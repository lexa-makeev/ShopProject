import { useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Container,
    Input,
    Text,
    Heading,
    VStack,
    HStack,
    Image,
} from "@chakra-ui/react";

function Weather() {
    const [value, setValue] = useState("");
    const [validate, setValidate] = useState(null);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    let key = "b6273b20c8f244ada72121353241905";

    function getWeather() {
        if (value !== "") {
            setValidate(null);
            setError(null);
            axios({
                method: "get",
                url: `http://api.weatherapi.com/v1/current.json?key=${key}&q=${value}`,
            })
                .then(function (response) {
                    setWeather(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                    setError("Ошибка при запросе данных");
                });
        } else {
            setValidate("Заполните поле");
        }
    }

    return (
        <Container>
            <Heading as="h1" mb={4} textAlign="center" marginBottom={"80px"}>
                Погода
            </Heading>
            {validate && <Text color="red.500">{validate}</Text>}
            {error && <Text color="red.500">{error}</Text>}
            <Box className="App" maxWidth="300px" mx="auto">
                <Input
                    placeholder="Введите название города"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    colorScheme="blue"
                    onClick={getWeather}
                    width={"100%"}
                    marginTop={"20px"}
                >
                    Узнать погоду
                </Button>
            </Box>

            {weather && (
                <Box mt={8} p={4} borderWidth="1px" borderRadius="lg">
                    <HStack spacing={8}>
                        <VStack align="start">
                            <Text>Страна: {weather.location.country}</Text>
                            <Text>Регион: {weather.location.region}</Text>
                            <Text>Город: {weather.location.name}</Text>
                            <Text>Температура: {weather.current.temp_c}°C</Text>
                        </VStack>
                        <VStack align="start">
                            <Image
                                alt="weather"
                                src={weather.current.condition.icon.replace(
                                    "//",
                                    "https://"
                                )}
                            />
                        </VStack>
                    </HStack>
                </Box>
            )}
        </Container>
    );
}

export default Weather;
