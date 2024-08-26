import { Box, Button, MultiSelect, SelectItem, Text, useColorMode, Wrap } from '@yamada-ui/react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor';

const MainPage = () => {
    const [response, setResponse] = useState('');
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash

    const handleClick = () => {
        // todo: 画面ができたら、画面からデータを受け渡すこと
        const requestData = {
            snippet: "Example Snippet",
            expiration_stat: "eternal"
        }

    fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            setResponse(data)
        })
        .catch(error => console.error('Error fetching data:', error))
    }

    const items: SelectItem[] = [
        { label: "1min", value: "1min"},
        { label: "10min", value: "10min"},
        { label: "1day", value: "1day" },
        { label: "1week", value: "1week" },
        { label: "eternal", value: "eternal" },
    ]

    const { colorMode, changeColorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <Wrap gap="ld">
                <Button onClick={() => changeColorMode("light")}>ライトモード</Button>
                <Button onClick={() => changeColorMode("dark")}>ダークモード</Button>
                <Button onClick={() => changeColorMode("system")}>システム</Button>
            <Box >
                <h1>Main Page</h1>
                <Text>こんにちは、世界!</Text>
                <Button
                    isLoading
                    loadingPlacement='end'
                    loadingIcon="grid"
                    colorScheme='sky'
                    size="lg"
                    m={5}
                >
                    Click me!
                </Button>
                <MultiSelect 
                focusBorderColor='green.500'
                maxW="xs"
                placeholder='有効期限を選択' items={items} />
            </Box>
            </Wrap>
            <Box>
                <Text>
                    ほぅ...青ざめた血ねぇ...
                </Text>
                <Editor></Editor>
            </Box>
        </>
    )
}

export default MainPage