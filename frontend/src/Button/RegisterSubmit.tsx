import { Box, Button, Center,  useDisclosure, useColorModeValue } from "@yamada-ui/react"
import { useExpirationContext } from "../Pulldown/ExpirationProvider"
import { useEffect, useState } from "react"
import { useLanguageContext } from "../Languages/LanguageProvider"
import { useCodeContext } from "../Editor/CodeProvider"
import { defaultExpirationValue } from "../Pulldown/Expiration"
import SubmitSettingModal from "../Modal/SubmitSettingModal"
import ResultModal from "../Modal/ResultModal"
import { useButtonColorScheme } from "./ButtonColorScheme"

interface SuccessResponse {
    url: string
}

interface ErrorResponse {
    error: string
}

type SnippetResponse = SuccessResponse | ErrorResponse

export const RegisterSubmitButton = () => {
    const { code } = useCodeContext()
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

    useEffect(() => {
        if (responseData) {
            const parseData = JSON.parse(responseData)
            setSnippetURL(parseData.url || "")
        }
    }, [responseData])


    const handleSubmitButton = () => {
        // 1つ目のモーダルを閉じる
        onSubmitSettingClose()
        
        const requestJsonData = {
            snippet: code,
            snippet_language: language,
            expiration_stat: expiration,
        }

        // 有効期限を初期化する
        setExpiration(defaultExpirationValue)

        fetchSnippetURL(requestJsonData)
    }

    const fetchSnippetURL = (requestJsonData: object) => {
        // todo: fetchURLを変更する
        fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestJsonData)
        })
            .then(response => response.json())
            .then(handleResponse)
            .catch(() => {
                handleFetchError()
            })
    }

    const handleFetchError = () => {
        setIsResponseError(true)
        onResultModalOpen()
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