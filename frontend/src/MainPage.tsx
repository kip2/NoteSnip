import { Box,  Button,  Center,  Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import { RegisterSubmitButton } from './Button/RegisterSubmit';
import Header from './Header/Header';
import { useEffect, useRef, useState } from 'react';

const MainPage = () => {
    const [ errorTitle, setErrorTitle ] = useState("")
    const [errorReponse, setErrorReponse] = useState("")
    const [ fetchedCode, setFetchedCode] = useState("")
    const [ fetchedLanguage, setFectchedLanguage] = useState("")

    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const pathHash = params.hash
    const isFirstRender = useRef(true)

    const bg = useColorModeValue("white", "neutral.900")

    // dotenvからの読み込み
    const path = import.meta.env.VITE_GET_API_PATH

    useEffect(() => {
        if (isFirstRender.current && pathHash) {
            fetchDataByHash(pathHash)
        }

        // 初回のみの動作にするため、useRefを更新する
        isFirstRender.current = false
    }, [pathHash])

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
                if (data.error === "No data found") {
                    const title = "データ取得エラー"
                    const message = "データが見つかりませんでした。URLが間違っている可能性があります"
                    setErrorTitle(title)
                    setErrorReponse(message)
                } else if (data.error === "Data is expired") {
                    const title = "有効期限切れ"
                    const message = "データの有効期限が切れています。無効なURLです。"
                    setErrorTitle(title)
                    setErrorReponse(message)
                }
                onOpen()
            } else {
                setFetchedCode(data.snippet)
                setFectchedLanguage(data.snippet_language)
            }
        } catch(error) {
            console.error("Error occured while fetching:", error)
        }
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
            </Container>

            <Modal
                isOpen={isOpen}
            >
                <ModalOverlay/>
                <Center>
                    <ModalHeader>
                        {errorTitle}
                    </ModalHeader>
                </Center>
                <ModalBody display="flex" flexDirection="column" alignItems="center">
                    <Box>
                        <Text>
                            {errorReponse}
                        </Text>
                    </Box>
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