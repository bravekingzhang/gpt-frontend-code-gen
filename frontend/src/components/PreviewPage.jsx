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
    <Box>
      <Input value={result} isReadOnly />

      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        <Button onClick={clear} colorScheme="teal" variant="outline">Clear</Button>
        <Button onClick={calculate} colorScheme="green" variant="outline">Result</Button>
        <Button name="/" onClick={handleClick} colorScheme="gray" variant="outline">/</Button>
        <Button name="7" onClick={handleClick} colorScheme="gray" variant="outline">7</Button>
        <Button name="8" onClick={handleClick} colorScheme="gray" variant="outline">8</Button>
        <Button name="9" onClick={handleClick} colorScheme="gray" variant="outline">9</Button>
        <Button name="*" onClick={handleClick} colorScheme="gray" variant="outline">*</Button>
        <Button name="4" onClick={handleClick} colorScheme="gray" variant="outline">4</Button>
        <Button name="5" onClick={handleClick} colorScheme="gray" variant="outline">5</Button>
        <Button name="6" onClick={handleClick} colorScheme="gray" variant="outline">6</Button>
        <Button name="-" onClick={handleClick} colorScheme="gray" variant="outline">-</Button>
        <Button name="1" onClick={handleClick} colorScheme="gray" variant="outline">1</Button>
        <Button name="2" onClick={handleClick} colorScheme="gray" variant="outline">2</Button>
        <Button name="3" onClick={handleClick} colorScheme="gray" variant="outline">3</Button>
        <Button name="+" onClick={handleClick} colorScheme="gray" variant="outline">+</Button>
        <Button name="0" onClick={handleClick} colorScheme="gray" variant="outline">0</Button>
        <Button name="." onClick={handleClick} colorScheme="gray" variant="outline">.</Button>
      </Grid>
    </Box>
  );
}

export default Calculator;