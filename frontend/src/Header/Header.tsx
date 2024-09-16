import { Box, Flex, Text, useColorModeValue } from'@yamada-ui/react';
import { ColorModeButton } from '../Button/ColorModeButton';
import GithubButton from '../Button/GithubButton';
 
const Header = () => {
  const headerBg = useColorModeValue("amber.200", "sky.800")
  const textColor = useColorModeValue("gray.700", "white")
  
  const githubURL = "https://github.com/kip2/NoteSnip"

  return (
    <Box as="header" bg={headerBg} p={3} pl={4}>
      <Flex align="center" justify="space-between">
        <Box>
          <ColorModeButton/>
        </Box>
        <Box>
          <Flex direction="column" align="center" maxWidth="100%">
            <Text fontSize="4xl" fontWeight="bold" color={textColor} className='dancing-script-regular'>
              NoteSnip
            </Text>
          </Flex>
          <Text fontSize="md" className='dancing-script-regular'>
            The website for sharing code snippets.
          </Text>
        </Box>
        <Box>
          <GithubButton
            url={githubURL}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
