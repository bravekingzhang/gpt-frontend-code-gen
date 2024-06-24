import React, { useState } from 'react';
import { Box, Button, Input, Grid } from '@chakra-ui/react';

const Calculator = () => {
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  }

  const clear = () => {
    setResult("");
  }

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch(err) {
      setResult("Error");
    }
  }

  return (
    <Box maxW="sm" mx="auto" textAlign="center" p={4} bg="gray.200" borderRadius="lg">
      <Input value={result} isReadOnly placeholder="0" mb={4} bg="white" />
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <Button name="1" onClick={handleClick} bg="gray.400" color="white">1</Button>
        <Button name="2" onClick={handleClick} bg="gray.400" color="white">2</Button>
        <Button name="3" onClick={handleClick} bg="gray.400" color="white">3</Button>
        <Button name="+" colorScheme="orange" onClick={handleClick}>+</Button>
        <Button name="4" onClick={handleClick} bg="gray.400" color="white">4</Button>
        <Button name="5" onClick={handleClick} bg="gray.400" color="white">5</Button>
        <Button name="6" onClick={handleClick} bg="gray.400" color="white">6</Button>
        <Button name="-" colorScheme="orange" onClick={handleClick}>-</Button>
        <Button name="7" onClick={handleClick} bg="gray.400" color="white">7</Button>
        <Button name="8" onClick={handleClick} bg="gray.400" color="white">8</Button>
        <Button name="9" onClick={handleClick} bg="gray.400" color="white">9</Button>
        <Button name="*" colorScheme="orange" onClick={handleClick}>*</Button>
        <Button name="C" colorScheme="red" onClick={clear}>C</Button>
        <Button name="0" onClick={handleClick} bg="gray.400" color="white">0</Button>
        <Button name="=" colorScheme="green" onClick={calculate}>=</Button>
        <Button name="/" colorScheme="orange" onClick={handleClick}>/</Button>
      </Grid>
    </Box>
  );
}

export default Calculator;