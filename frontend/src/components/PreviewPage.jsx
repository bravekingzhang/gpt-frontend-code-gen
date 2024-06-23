import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <Container maxW="container.sm" centerContent p={8}>
      <VStack
        w="full"
        h="full"
        p={10}
        spacing={6}
        align="center"
        backgroundColor="gray.200"
        borderRadius="xl"
      >
        <Box w="full">
          <Text color="black" fontSize="4xl" textAlign="center" m={4}>
            Login
          </Text>
        </Box>
        <Box w="full">
          <form onSubmit={handleLogin}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full" mt={6}>
              Login
            </Button>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;