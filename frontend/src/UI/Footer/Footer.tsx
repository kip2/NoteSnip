import { Box, Flex, Text, useColorModeValue } from'@yamada-ui/react';

const Footer = () => {
    const headerBg = useColorModeValue("amber.200", "sky.800")
    const textColor = useColorModeValue("gray.700", "white")

    return (
        <Box as="header" bg={headerBg} p={3} pl={4}>
            <Flex align="center" justify="center">
                <Box>
                    <Flex direction="column" align="center" maxWidth="100%">
                        <Text fontSize="md" fontWeight="bold" color={textColor} className='dancing-script-regular'>
                            © 2024 kip2
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default Footer;
