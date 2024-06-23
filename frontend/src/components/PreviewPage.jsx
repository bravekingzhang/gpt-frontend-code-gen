import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const PreviewPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
  };

  return (
    <Container>

      <Center>
        <h3>code Generate Preview Page</h3>
      </Center>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
}

export default PreviewPage;