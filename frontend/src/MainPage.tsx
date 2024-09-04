import { Box, Button, Center, ColorMode, Container, Heading, NativeSelectItem, useColorMode } from '@yamada-ui/react';
import { NativeSelect  } from '@yamada-ui/react';
import { IconButton } from '@yamada-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import { Sun } from '@yamada-ui/lucide';
import { getTheme } from './Themes/Themes';
import { useCodeMirrorTheme } from './Themes/ThemeContext';
import { useSelectedThemeContext } from './Themes/ThemeProvider';
import { useCodeContext } from './Code/CodeProvider';
import { useLanguageContext } from './Languages/LanguageProvider';

const MainPage = () => {
    const [response, setResponse] = useState('');
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash

    const { code } = useCodeContext()
    const { language } = useLanguageContext()

    

    const handleSubmitButton = () => {
        const requestJsonData = {
            snippet: code,
            snippet_language: language,
            expiration_stat: selectedExpirationValue,
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
                console.log("response:",data)
                setResponse(data)
            })
            .catch(error => console.error('Error fetching data:', error))
    }

    const items: NativeSelectItem[] = [
        { label: "1min", value: "1min"},
        { label: "10min", value: "10min"},
        { label: "1day", value: "1day" },
        { label: "1week", value: "1week" },
        { label: "eternal", value: "eternal" },
    ]

    const { colorMode, changeColorMode, toggleColorMode } = useColorMode()

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

    const [selectedExpirationValue, setSelectedExpirationValue] = useState("")

    const handleExpirationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExpirationValue(event.target.value)
    }


    return (
        <>
            <Container size="ld">
                <Center>
                    <Heading>Snippet Sharing Service(SSS(仮))</Heading>
                </Center>
                <Box gap="ms">
                    <Editor></Editor>
                </Box>
                
                <Center>
                    <Box>
                        <NativeSelect
                            focusBorderColor='green.500'
                            maxW="xs"
                            placeholder='有効期限を選択' 
                            onChange={handleExpirationChange}
                            items={items} />
                    </Box>
                </Center>
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