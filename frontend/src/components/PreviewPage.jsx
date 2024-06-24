import React from 'react';
import { Box, Heading, Text, Avatar, Button, Flex } from '@chakra-ui/react';

const UserProfile = () => {
  return (
    <Box maxW="sm" mx="auto" textAlign="center" p={4} bg="gray.200" borderRadius="lg">
      <Avatar size="2xl" name="John Doe" src="https://bit.ly/broken-link" mb={4} />
      <Heading mb={2}>John Doe</Heading>
      <Text fontSize="lg" color="gray.500" mb={4}>Front-end Developer</Text>
      <Text color="gray.600" mb={6}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
      </Text>
      <Flex justify="center" gap={4}>
        <Button colorScheme="blue">Follow</Button>
        <Button colorScheme="green">Message</Button>
      </Flex>
    </Box>
  );
}

export default UserProfile;