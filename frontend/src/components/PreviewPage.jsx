import React from 'react';
import { Box, Image, Text, Button } from "@chakra-ui/react";

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    bio: 'Front-end developer. Passionate about React and Chakra UI.',
    avatar: 'https://via.placeholder.com/150',
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
      <Image borderRadius="full" boxSize="150px" src={user.avatar} alt={user.name} m="auto" />
      <Box mt={4} textAlign="center">
        <Text fontSize="2xl">{user.name}</Text>
        <Text mt={2}>{user.bio}</Text>
      </Box>
      <Button colorScheme="teal" variant="outline" width="full" mt={4}>
        Follow
      </Button>
    </Box>
  );
};

export default UserProfile;