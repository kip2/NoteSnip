import { Box, Center, Flex, Text, useColorModeValue } from'@yamada-ui/react';

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
                    <Box height={2}/>
                    <Center>
                        <Text fontSize="md" className='dancing-script-regular'> 
                            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                                <img alt="Creative Commons License" style={{borderWidth: 0}} src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
                            </a>                
                        </Text>
                    </Center>
                    <Text>
                        このコンテンツは
                        <a href="http://creativecommons.org/licenses/by/4.0/">CC-BY 4.0ライセンス</a>
                        の下で提供されています。
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default Footer;
