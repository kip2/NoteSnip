import { Box, Button, Center,  useDisclosure } from "@yamada-ui/react"
import { useExpirationContext } from "../Pulldown/ExpirationProvider"
import { useEffect, useState } from "react"
import { useLanguageContext } from "../Languages/LanguageProvider"
import { useCodeContext } from "../Editor/CodeProvider"
import { defaultExpirationValue } from "../Pulldown/Expiration"
import SubmitSettingModal from "../Modal/SubmitSettingModal"
import ResultModal from "../Modal/ResultModal"
import { useButtonColorScheme } from "./ButtonColorScheme"
import RegisterLoadingModal from "../Modal/RegisterLoadingModal"

interface SuccessResponse {
    url: string
}

interface ErrorResponse {
    error: string
}

type SnippetResponse = SuccessResponse | ErrorResponse

export const RegisterSubmitButton = () => {
    const { codeRef } = useCodeContext()
    const { language } = useLanguageContext()
    const [ responseData, setResponseData ] = useState<string | null>(null)
    const { isOpen: isSubmitSettingOpen, onOpen: onSubmitSettingOpen, onClose: onSubmitSettingClose } = useDisclosure()
    const { isOpen: isResultModalOpen, onOpen: onResultModalOpen, onClose: onResultModalClose} = useDisclosure()
    const { expiration, setExpiration } = useExpirationContext()
    const [ isResponseError, setIsResponseError ] = useState(false)
    const [ snippetURL, setSnippetURL ] = useState("")
    const [ isCopied, setIsCopied ] = useState(false)
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false)

    const SubmitButtonColorScheme = useButtonColorScheme()

    // dotenvからの読み込み
    const path = import.meta.env.VITE_REGISTER_API_PATH

    useEffect(() => {
        if (responseData) {
            const parseData = JSON.parse(responseData)
            setSnippetURL(parseData.url || "")
        }
    }, [responseData])


    const handleSubmitButton = async () => {
        // 1つ目のモーダルを閉じる
        onSubmitSettingClose()

        console.log("codeRef:", codeRef.current)

        const requestJsonData = {
            snippet: codeRef.current,
            snippet_language: language,
            expiration_stat: expiration,
        }

        // 有効期限プルダウンの値を初期化する
        setExpiration(defaultExpirationValue)

        setLoadingOpen(true)

        try { 
            await fetchSnippetURL(requestJsonData)
        } catch  {
            handleFetchError()
        } finally {
            setLoadingOpen(false)
        }
    }
    

    const fetchSnippetURL = async (requestJsonData: object) => {
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestJsonData)
        })

        if (!response.ok) {
            throw new Error("Fetch failed")
        }

        const data = await response.json()
        handleResponse(data)
    }

    const handleFetchError = () => {
        setIsResponseError(true)
        onResultModalOpen()
        setLoadingOpen(false)
    }

    const handleResponse = (data: SnippetResponse) => {
        setResponseData(JSON.stringify(data, null, 2))
        if ("url" in data) {
            setIsResponseError(false)
        } else {
            setIsResponseError(true)
        }
        onResultModalOpen()
    }



    const handleCopyButton = () => {
        navigator.clipboard.writeText(snippetURL)
            .then(() => {
                handleCopySuccess()
            })
            .catch(() => {
                handleCopyFailure()
            }) 
    }

    const handleCopySuccess = () => {
        setIsCopied(true)
        togglePopover()
    }

    const handleCopyFailure = () => {
        setIsCopied(false)
        togglePopover()
    }

    const togglePopover = () => {
        setIsPopoverOpen(true)
        setTimeout(() => setIsPopoverOpen(false), 2000)
    }

    const [ loadingOpen, setLoadingOpen ] = useState(false)

    return(
        <>
            <Center>
                <Box>
                    <Center>
                        <Button 
                            colorScheme={SubmitButtonColorScheme}
                            onClick={onSubmitSettingOpen}>共有URL作成</Button>
                    </Center>
                </Box>
            </Center>

            <SubmitSettingModal
                isOpen={isSubmitSettingOpen}
                onClose={onSubmitSettingClose}
                onSubmit={handleSubmitButton}
            />

            <RegisterLoadingModal
                isOpen={loadingOpen}
            />

            <ResultModal 
                isOpen={isResultModalOpen}
                onClose={onResultModalClose}
                isError={isResponseError}
                snippetURL={snippetURL}
                isCopied={isCopied}
                isPopoverOpen={isPopoverOpen}
                onCopy={handleCopyButton}
            />

        </>
    )
}