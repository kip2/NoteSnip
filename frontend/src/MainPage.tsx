import { Box,  Button,  Center,  Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import { RegisterSubmitButton } from './Button/RegisterSubmit';
import Header from './Header/Header';
import { useEffect, useRef, useState } from 'react';

const MainPage = () => {
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const pathHash = params.hash

    const bg = useColorModeValue("white", "neutral.900")

    const isFirstRender = useRef(true)

    // todo: pathの読み込みは別ファイルに設定したい
    const path = "http://127.0.0.1:8000/get/"

    useEffect(() => {
        if (isFirstRender.current && pathHash) {
            fetchDataByHash(pathHash)
        }

        // 初回のみの動作にするため、useRefを更新する
        isFirstRender.current = false
    }, [pathHash])

    const [errorReponse, setErrorReponse] = useState("")

    const [ fetchedCode, setFetchedCode] = useState("")
    const [ fetchedLanguage, setFectchedLanguage] = useState("")

    const fetchDataByHash = async (hash: string) => {
        try {
            const response = await fetch(`${path}${hash}`, {
                method: "GET",
            })

            if (!response.ok) {
                // todo: 200以外のレスポンスの場合の処理
                console.error("Error fetching data:", response.statusText)
                setErrorReponse(response.statusText)
                return
            }

            const data = await response.json()

            if (data.error) {
                // todo: errorがno dataである場合にはデータが存在しませんと表示する
                setErrorReponse(data.error)
                onOpen()
            } else {
                console.log("Data:", data)
                // todo: 正常の場合の処理を追加する
                setFetchedCode(data.snippet)
                setFectchedLanguage(data.snippet_language)
                console.log("expiration:", data.expiration_stat)
            }
        } catch(error) {
            console.error("Error occured while fetching:", error)
        }
    }

    const handleClick = () => {
        console.log("hash:",pathHash)
    }

    const {isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box bg={bg}>
            <Header></Header>
            <Container size="ld">
                <Box gap="ms">
                    <Editor
                        fetchedCode={fetchedCode}
                        fetchedLanguage={fetchedLanguage}
                    ></Editor>
                </Box>
                <RegisterSubmitButton/>
                <Button onClick={handleClick} >テスト</Button>
            </Container>

            <Modal
                isOpen={isOpen}
            >
                <ModalOverlay/>
                <Center>
                    <ModalHeader>
                        データが取得できませんでした
                    </ModalHeader>
                </Center>
                <ModalBody>
                    {errorReponse}
                </ModalBody>
                <Center>
                    <ModalFooter>
                        <Button onClick={onClose}>閉じる</Button>
                    </ModalFooter>
                </Center>
            </Modal>
        </Box>
    )
}

export default MainPage