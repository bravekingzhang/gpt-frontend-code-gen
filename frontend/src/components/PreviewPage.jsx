import React, { useState } from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { cloneDeep } from 'lodash';

const SIZE = 4;

const initializeGame = () => {
  let grid = Array(SIZE).fill().map(() => Array(SIZE).fill(0));

  console.table(grid);
  addNumber(grid);
  console.table(grid);
  addNumber(grid);
  console.table(grid);

  return grid;
};

const addNumber = (grid) => {
  let added = false;
  while (!added) {
    let rand1 = Math.floor(Math.random() * SIZE);
    let rand2 = Math.floor(Math.random() * SIZE);
    if (grid[rand1][rand2] === 0) {
      grid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
  }
};

const Game2048 = () => {
  const [grid, setGrid] = useState(() => initializeGame());

  const moveLeft = () => {
    let oldGrid = grid;
    let newGrid = cloneDeep(grid);

    for (let i = 0; i < SIZE; i++) {
      let b = [];
      for (let j = 0; j < SIZE; j++) {
        if (newGrid[i][j] !== 0) {
          b.push(newGrid[i][j]);
          newGrid[i][j] = 0;
        }
      }
      for (let j = 0; j < SIZE && b.length > 0; j++) {
        newGrid[i][j] = b.shift();
      }
    }
    setGrid(newGrid);
    addNumber(newGrid);
  };

  return (
    <Box maxW="sm" mx="auto" textAlign="center" p={4}>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {grid.map((row, i) =>
          row.map((num, j) => (
            <Text key={`${i}-${j}`} w="100%" h="20" bg="gray.200" p={2}>
              {num !== 0 ? num : ''}
            </Text>
          ))
        )}
      </Grid>
      <Button onClick={moveLeft} mt={4}>
        Move Left
      </Button>
    </Box>
  );
};

export default Game2048;