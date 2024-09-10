import { Box,  Button,  Container, useColorModeValue} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import { RegisterSubmitButton } from './Button/RegisterSubmit';
import Header from './Header/Header';
import { useEffect, useRef } from 'react';

const MainPage = () => {
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const pathHash = params.hash

    const bg = useColorModeValue("white", "neutral.900")

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current && pathHash) {
            fetchDataByHash(pathHash)
        }

        // 初回のみの動作にするため、useRefを更新する
        isFirstRender.current = false
    }, [pathHash])

    const fetchDataByHash = async (hash: string) => {
        const response = await fetch(`http://127.0.0.1:8000/get/${hash}`, {
            method: "GET",
        })

        if (!response.ok) {
            console.error("Error fetching data:", response.statusText)
            return
        }

        const data = await response.json()
        console.log(data)
    }



    const handleClick = () => {
        console.log("hash:",pathHash)
    }

    return (
        <Box bg={bg}>
            <Header></Header>
            <Container size="ld">
                <Box gap="ms">
                    <Editor></Editor>
                </Box>
                <RegisterSubmitButton/>
                <Button onClick={handleClick} >テスト</Button>
            </Container>
        </Box>
    )
}

export default MainPage