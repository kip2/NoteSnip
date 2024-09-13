import { Box,  Button,  Center,  Container, Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import Header from './Header/Header';
import { useEffect, useRef, useState } from 'react';
import { useButtonColorScheme } from './Button/ButtonColorScheme';
import ErrorReponseModal from './Modal/ErrorResponseModal';

const MainPage = () => {
    const [ errorTitle, setErrorTitle ] = useState("")
    const [errorReponse, setErrorReponse] = useState("")
    const [ fetchedCode, setFetchedCode] = useState("")
    const [ fetchedLanguage, setFectchedLanguage] = useState("")

    const {isOpen: isErrorModalOpen, onOpen: onErrorModalOpen, onClose: onErrorModalClose } = useDisclosure()
    const {isOpen: isLoadingModalOpen, onOpen: onLoadingModalOpen, onClose: onLoadingModalClose } = useDisclosure()

    const [ abortController, setAbortController] = useState<AbortController | null>()

    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const pathHash = params.hash
    const isFirstRender = useRef(true)

    const bg = useColorModeValue("white", "neutral.900")
    const buttonColorScheme = useButtonColorScheme()

    // dotenvからの読み込み
    const path = import.meta.env.VITE_GET_API_PATH

    useEffect(() => {
        if (isFirstRender.current && pathHash) {
            fetchDataByHash(pathHash)
        }

        // 初回のみの動作にするため、useRefを更新する
        isFirstRender.current = false
    }, [pathHash])


    const cancelFetch = () => {
        if (abortController) {
            abortController.abort()
        }
    }

    const fetchDataByHash = async (hash: string) => {
        const controller = new AbortController()
        setAbortController(controller)

        onLoadingModalOpen()

        try {
            const response = await fetch(`${path}${hash}`, {
                method: "GET",
                signal: controller.signal
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
                    <Box height="15px"/>
                    <Loading fontSize="6xl" color="blue"/>
                    <Box height="15px"/>
                </ModalBody>
                <ModalFooter display="flex" flexDirection="column" alignItems="center">
                    <Button 
                        colorScheme={buttonColorScheme}
                        onClick={cancelFetch}>
                        中断
                    </Button>
                </ModalFooter>
            </Modal>

            <ErrorReponseModal
                isOpen={isErrorModalOpen}
                onClose={onErrorModalClose}
                errorTitle={errorTitle}
                errorResponse={errorReponse}
            />
        </Box>
    )
}

export default MainPage