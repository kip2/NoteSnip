import { Box,  Button,  Center,  Container, Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
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
        onLoadingModalOpen()
        try {
            const response = await fetch(`${path}${hash}`, {
                method: "GET",
            })

            console.log("response:", response)

            if (!response.ok) {
                console.error("Error fetching data:", response.statusText)
                const title = "サーバーエラー"
                const message = "サーバー側でエラーが起きています。時間をおいて試してください。"
                setErrorTitle(title)
                setErrorReponse(message)
                onErrorModalOpen()
                return
            }

            const data = await response.json()
            console.log(data)

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
                } else if (data.error === "Internal server error") {
                    const title = "サーバーエラー"
                    const message = "サーバー側でエラーが起きています。時間をおいて試してください。"
                    setErrorTitle(title)
                    setErrorReponse(message)
                }
                onErrorModalOpen()
            } else {
                setFetchedCode(data.snippet)
                setFectchedLanguage(data.snippet_language)
            }
        } catch(error) {
            console.error("Error occured while fetching:", error)
            const title = "ネットワークエラー"
            const message = "データの取得中にネットワークエラーが発生しました"
            setErrorTitle(title)
            setErrorReponse(message)
        } finally {
            onLoadingModalClose()
        }
    }

    const {isOpen: isErrorModalOpen, onOpen: onErrorModalOpen, onClose: onErrorModalClose } = useDisclosure()
    const {isOpen: isLoadingModalOpen, onOpen: onLoadingModalOpen, onClose: onLoadingModalClose } = useDisclosure()


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

            <Modal isOpen={isLoadingModalOpen}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)"/>
                <Center>
                    <ModalHeader>
                        Now Loading...
                    </ModalHeader>
                </Center>
                <ModalBody display="flex" flexDirection="column" alignItems="center">
                    <Loading fontSize="3xl" color="blue"/>
                </ModalBody>
            </Modal>

            <Modal
                isOpen={isErrorModalOpen}
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
                        <Button onClick={onErrorModalClose}>閉じる</Button>
                    </ModalFooter>
                </Center>
            </Modal>
        </Box>
    )
}

export default MainPage