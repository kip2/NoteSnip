import { Box, Flex, Text, useColorModeValue } from'@yamada-ui/react';
import { ColorModeButton } from '../Button/ColorModeButton';
 
const Header = () => {
  const headerBg = useColorModeValue("neutral.200", "fuchsia.900")
  const textColor = useColorModeValue("gray.700", "white")
  return (
    <Box as="header" bg={headerBg} p={3} pl={4}>
      <Flex align="center" justify="space-between">
        <Text fontSize="xl" fontWeight="bold" color={textColor} className='dancing-script-regular'>
          Snippet Sharing Service
        </Text>
        <Flex gap={4}>
          <ColorModeButton/>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
