import { Box, Button, Flex, Text, useColorModeValue, useDisclosure } from'@yamada-ui/react';
import { ColorModeButton } from '../Button/ColorModeButton';
import GithubButton from '../Button/GithubButton';
import HelpModal from '../Modal/HelpModal';
import HelpButton from '../Button/HelpButton';

const Header = () => {
  const headerBg = useColorModeValue("amber.200", "sky.800")
  const textColor = useColorModeValue("gray.700", "white")
  
  const githubURL = "https://github.com/kip2/NoteSnip"

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box as="header" bg={headerBg} p={3} pl={4}>
      <Flex align="center" justify="space-between">
        <Box>
          <ColorModeButton/>
        </Box>
        <Flex display="column" align="center" maxWidth="100%">
          <Flex alignItems="center" justifyContent="center">
            <Text fontSize="4xl" fontWeight="bold" color={textColor} className='dancing-script-regular'>
              NoteSnip
            </Text>
            <Button
              onClick={onOpen}
              ml={2}
              size=""
              borderRadius="full"
              variant="ghost"
              color={textColor}
            >
              <HelpButton/>
            </Button>
          </Flex>
          <Text fontSize="md" className='oswald-script-regular'>
            The website for sharing code snippets.
          </Text>
        </Flex>
        <Box>
          <GithubButton
            url={githubURL}
          />
        </Box>
      </Flex>
      <HelpModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default Header;
