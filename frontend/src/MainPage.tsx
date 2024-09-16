import { Box, Center, Container,  useColorModeValue, useDisclosure} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import Header from './Header/Header';
import { useEffect, useRef, useState } from 'react';
import ErrorReponseModal from './Modal/ErrorResponseModal';
import GetLoadingModal from './Modal/GetLoadingModal';
import { useCodeContext } from './Editor/CodeProvider';

const MainPage = () => {
    const [ errorTitle, setErrorTitle ] = useState("")
    const [errorResponse, setErrorReponse] = useState("")
    const { setCode } = useCodeContext()
    const [ fetchedLanguage, setFectchedLanguage] = useState("")

    const {isOpen: isErrorModalOpen, onOpen: onErrorModalOpen, onClose: onErrorModalClose } = useDisclosure()
    const {isOpen: isLoadingModalOpen, onOpen: onLoadingModalOpen, onClose: onLoadingModalClose } = useDisclosure()

    const [ abortController, setAbortController] = useState<AbortController | null>()

    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const pathHash = params.hash
    const isFirstRender = useRef(true)

    const bg = useColorModeValue("white", "neutral.900")

    // dotenvからの読み込み
    const path = import.meta.env.VITE_GET_API_PATH

    const cancelFetch = () => {
        if (abortController) {
            abortController.abort()
        }
    }

    const handleError = (errorType: string) => {
        let title = ""
        let message = ""

        switch (errorType) {
            case "No data found":
                title = "データ取得エラー"
                message = "データが見つかりませんでした。URLが間違っている可能性があります。"
                break
            case "Data is expired":
                title = "有効期限切れ"
                message = "データの有効期限が切れています。無効なURLです。"
                break
            case "Internal server error":
                title = "サーバーエラー"
                message = "サーバー側でエラーが起きています。時間をおいて試してください。"
                break
            default:
                title = "サーバーエラー"
                message = "サーバー側でエラーが起きています。時間をおいて試してください。"
        }
        setErrorTitle(title)
        setErrorReponse(message)
        onErrorModalOpen()
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

            if (!response.ok) {
                handleError("")
                return
            }

            const data = await response.json()

            if (data.error) {
                handleError(data.error)
            } else {
                setCode(data.snippet)
                setFectchedLanguage(data.snippet_language)
            }
        } catch {
            handleError("")
        } finally {
            onLoadingModalClose()
        }
    }

    useEffect(() => {
        if (isFirstRender.current && pathHash) {
            fetchDataByHash(pathHash)
        }

        // 初回のみの動作にするため、useRefを更新する
        isFirstRender.current = false
    }, [pathHash])

    return (
        <Box bg={bg}>
            <Header></Header>
            <Center>
            <Container size="ld" maxWidth="1200px" >
                <Box gap="ms">
                    <Editor
                        fetchedLanguage={fetchedLanguage}
                    ></Editor>
                </Box>
            </Container>

            </Center>

            <GetLoadingModal
                isOpen={isLoadingModalOpen}
                onClick={cancelFetch}
            />

            <ErrorReponseModal
                isOpen={isErrorModalOpen}
                onClose={onErrorModalClose}
                errorTitle={errorTitle}
                errorResponse={errorResponse}
            />
        </Box>
    )
}

export default MainPage