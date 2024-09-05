import { Box, Flex, Text, Button } from'@yamada-ui/react';
 
const Header = () => {
  return (
    <Box as="header" bg="brack.500" p={4}>
      <Flex align="center" justify="space-between">
        <Text fontSize="xl" fontWeight="bold" color="white">
          My App
        </Text>
        <Flex gap={4}>
          <Button colorScheme="teal" variant="outline">
            Home
          </Button>
          <Button colorScheme="teal" variant="outline">
            About
          </Button>
          <Button colorScheme="teal" variant="outline">
            Contact
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
