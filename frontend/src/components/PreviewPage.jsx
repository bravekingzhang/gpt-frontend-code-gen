import React from 'react';
import { Box, Heading, Text, Avatar, Button, Flex, Icon, Link, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter, FaRegNewspaper, FaRegLightbulb } from 'react-icons/fa';

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
      <Flex justify="center" gap={4} mb={6}>
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
      <Heading size="md" mb={2}>Recent Articles</Heading>
      <List spacing={2} mb={6}>
        <ListItem>
          <ListIcon as={FaRegNewspaper} color="blue.500" />
          Article 1
        </ListItem>
        <ListItem>
          <ListIcon as={FaRegNewspaper} color="blue.500" />
          Article 2
        </ListItem>
      </List>
      <Heading size="md" mb={2}>Patents</Heading>
      <List spacing={2}>
        <ListItem>
          <ListIcon as={FaRegLightbulb} color="green.500" />
          Patent 1
        </ListItem>
        <ListItem>
          <ListIcon as={FaRegLightbulb} color="green.500" />
          Patent 2
        </ListItem>
      </List>
    </Box>
  );
}

export default UserProfile;