import { Box, Button, Center, ColorMode, Container, Heading, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay,  useColorMode } from '@yamada-ui/react';
import { IconButton } from '@yamada-ui/react';
import { useEffect, } from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import { Sun } from '@yamada-ui/lucide';
import { getTheme } from './Themes/Themes';
import { useCodeMirrorTheme } from './Themes/ThemeContext';
import { useSelectedThemeContext } from './Themes/ThemeProvider';
import { ExpirationPulldown } from './Pulldown/Expiration';
import { RegisterSubmit } from './Button/RegisterSubmit';

const MainPage = () => {
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash

    const { colorMode, changeColorMode } = useColorMode()

    const { setTheme } = useCodeMirrorTheme()
    const handleColorModeChange = (mode: ColorMode) => {
        changeColorMode(mode)
        const currentTheme = getTheme(mode as string)
        setTheme(currentTheme)
    }

    const { setSelectedTheme } = useSelectedThemeContext()

    useEffect(() => {
        const currentTheme = getTheme(colorMode as string)
        setSelectedTheme(colorMode as string)
        setTheme(currentTheme)
    }, [colorMode, setSelectedTheme, setTheme])

    return (
        <>
            <Container size="ld">
                <Center>
                    <Heading>Snippet Sharing Service(SSS(仮))</Heading>
                </Center>
                <Box gap="ms">
                    <Editor></Editor>
                </Box>


                <ExpirationPulldown/>
                
                <RegisterSubmit/>
                <Center>
                    <Box display="flex" gap="md">
                        <Button onClick={()=>handleColorModeChange("light")}>ライトモード</Button>
                        <Button onClick={() => handleColorModeChange("dark")}>ダークモード</Button>
                        <IconButton icon={<Sun />} />
                    </Box>
                </Center>
            </Container>
        </>
    )
}

export default MainPage