import React from 'react';
import { Box, Heading, Text, Avatar, Button, Flex, Icon, Link } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
      <Flex justify="center" gap={4} mb={4}>
        <Button colorScheme="blue">Follow</Button>
        <Button colorScheme="green">Message</Button>
      </Flex>
      <Flex justify="center" gap={4}>
        <Link href="https://github.com/" isExternal>
          <Icon as={FaGithub} boxSize="24px" />
        </Link>
        <Link href="https://linkedin.com/" isExternal>
          <Icon as={FaLinkedin} boxSize="24px" />
        </Link>
        <Link href="https://twitter.com/" isExternal>
          <Icon as={FaTwitter} boxSize="24px" />
        </Link>
      </Flex>
    </Box>
  );
}

export default UserProfile;