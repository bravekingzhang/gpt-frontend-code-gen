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
        <Button onClick={clear} bg="orange.400" color="white">
          C
        </Button>
        <Button onClick={handleClick} name="/" bg="gray.600" color="white">
          /
        </Button>
        <Button onClick={handleClick} name="*" bg="gray.600" color="white">
          *
        </Button>
        <Button onClick={handleClick} name="-" bg="gray.600" color="white">
          -
        </Button>
        <Button onClick={handleClick} name="7" bg="gray.300" color="black">
          7
        </Button>
        <Button onClick={handleClick} name="8" bg="gray.300" color="black">
          8
        </Button>
        <Button onClick={handleClick} name="9" bg="gray.300" color="black">
          9
        </Button>
        <Button onClick={handleClick} name="+" bg="gray.600" color="white">
          +
        </Button>
        <Button onClick={handleClick} name="4" bg="gray.300" color="black">
          4
        </Button>
        <Button onClick={handleClick} name="5" bg="gray.300" color="black">
          5
        </Button>
        <Button onClick={handleClick} name="6" bg="gray.300" color="black">
          6
        </Button>
        <Button onClick={calculate} bg="gray.600" color="white">
          =
        </Button>
        <Button onClick={handleClick} name="1" bg="gray.300" color="black">
          1
        </Button>
        <Button onClick={handleClick} name="2" bg="gray.300" color="black">
          2
        </Button>
        <Button onClick={handleClick} name="3" bg="gray.300" color="black">
          3
        </Button>
        <Button onClick={handleClick} name="0" bg="gray.300" color="black">
          0
        </Button>
      </Grid>
    </VStack>
  );
};

export default Calculator;