import React, { useState } from 'react';
import { Button, VStack, Box, Grid, Text } from '@chakra-ui/react';

const Calculator = () => {
  const [value, setValue] = useState('');

  const handleClick = (e) => {
    setValue((prev) => prev + e.target.name);
  };

  const calculate = () => {
    try {
      setValue((eval(value) || '') + '');
    } catch (e) {
      setValue('error');
    }
  };

  const clear = () => {
    setValue('');
  };

  return (
    <VStack w="200px" h="300px" p={4} boxShadow="xl" bg="white">
      <Box w="100%" h="30%" bg="gray.200" borderRadius="lg">
        <Text textAlign="right" m={2} fontSize="2xl">
          {value}
        </Text>
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={2} w="100%" h="70%">
        <Button onClick={clear} colorScheme="teal" variant="outline">
          C
        </Button>
        <Button onClick={handleClick} name="/" colorScheme="teal" variant="outline">
          /
        </Button>
        <Button onClick={handleClick} name="*" colorScheme="teal" variant="outline">
          *
        </Button>
        <Button onClick={handleClick} name="-" colorScheme="teal" variant="outline">
          -
        </Button>
        <Button onClick={handleClick} name="7" colorScheme="teal" variant="outline">
          7
        </Button>
        <Button onClick={handleClick} name="8" colorScheme="teal" variant="outline">
          8
        </Button>
        <Button onClick={handleClick} name="9" colorScheme="teal" variant="outline">
          9
        </Button>
        <Button onClick={handleClick} name="+" colorScheme="teal" variant="outline">
          +
        </Button>
        <Button onClick={handleClick} name="4" colorScheme="teal" variant="outline">
          4
        </Button>
        <Button onClick={handleClick} name="5" colorScheme="teal" variant="outline">
          5
        </Button>
        <Button onClick={handleClick} name="6" colorScheme="teal" variant="outline">
          6
        </Button>
        <Button onClick={calculate} colorScheme="teal" variant="outline">
          =
        </Button>
        <Button onClick={handleClick} name="1" colorScheme="teal" variant="outline">
          1
        </Button>
        <Button onClick={handleClick} name="2" colorScheme="teal" variant="outline">
          2
        </Button>
        <Button onClick={handleClick} name="3" colorScheme="teal" variant="outline">
          3
        </Button>
        <Button onClick={handleClick} name="0" colorScheme="teal" variant="outline">
          0
        </Button>
      </Grid>
    </VStack>
  );
};

export default Calculator;