import { Box, Button, Center, ColorMode, Container, Heading, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay,  useColorMode, useDisclosure } from '@yamada-ui/react';
import { IconButton } from '@yamada-ui/react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import { Sun } from '@yamada-ui/lucide';
import { getTheme } from './Themes/Themes';
import { useCodeMirrorTheme } from './Themes/ThemeContext';
import { useSelectedThemeContext } from './Themes/ThemeProvider';
import { useCodeContext } from './EditorCode/CodeProvider';
import { useLanguageContext } from './Languages/LanguageProvider';
import { ExpirationPulldown } from './Pulldown/Expiration';
import { useExpirationContext } from './Pulldown/ExpirationProvider';

const MainPage = () => {
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash

    const { code } = useCodeContext()
    const { language } = useLanguageContext()

    const [ responseData, setResponseData ] = useState<string | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { expiration } = useExpirationContext()

    const handleSubmitButton = () => {
        const requestJsonData = {
            snippet: code,
            snippet_language: language,
            expiration_stat: expiration,
        }

        fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestJsonData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error("Response text:", text)
                    })
                }
                return response.json()
            })
            .then(data => {
                setResponseData(JSON.stringify(data, null, 2))
                onOpen()
            })
            .catch(error => console.error('Error fetching data:', error))
    }

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

                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                    <ModalOverlay />
                    <Center>
                        <ModalHeader>
                            レスポンス
                        </ModalHeader>
                    </Center>
                    <ModalBody>
                        <pre>{responseData}</pre>
                    </ModalBody>
                    <Center>
                        <ModalFooter>
                            <Button onClick={onClose}>閉じる</Button>
                        </ModalFooter>
                    </Center>

                </Modal>

                <ExpirationPulldown/>
                
                <Center>
                    <Box>
                        <Center>
                            <Button onClick={handleSubmitButton}>送信</Button>
                        </Center>
                    </Box>
                </Center>
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