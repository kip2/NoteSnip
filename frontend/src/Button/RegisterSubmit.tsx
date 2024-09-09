import { Box, Button, Center, FormControl, Input, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverBody, Motion, useColorModeValue } from "@yamada-ui/react"
import { useExpirationContext } from "../Pulldown/ExpirationProvider"
import { useEffect, useState } from "react"
import { useLanguageContext } from "../Languages/LanguageProvider"
import { useCodeContext } from "../Editor/CodeProvider"
import { CopyIcon } from "@yamada-ui/lucide"
import { defaultExpirationValue, ExpirationPulldown } from "../Pulldown/Expiration"
import SubmitSettingModal from "../Modal/SubmitSettingModal"

export const RegisterSubmit = () => {
    const { code } = useCodeContext()
    const { language } = useLanguageContext()
    const [ responseData, setResponseData ] = useState<string | null>(null)
    const { isOpen: isSubmitSettingOpen, onOpen: onSubmitSettingOpen, onClose: onSubmitSettingClose } = useDisclosure()
    const { isOpen: isResultModalOpen, onOpen: onResultModalOpen, onClose: onResultModalClose} = useDisclosure()
    const { expiration, setExpiration } = useExpirationContext()
    const [ isResponseError, setIsResponseError ] = useState(false)
    const [ snippetURL, setSnippetURL ] = useState("")

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

    // todo: any type
    const handleResponse = (data: any) => {
        setResponseData(JSON.stringify(data, null, 2))
        setIsResponseError(!data.url)
        onResultModalOpen()
    }


    useEffect(() => {
        if (responseData) {
            const parseData = JSON.parse(responseData)
            setSnippetURL(parseData.url || "")
        }
    }, [responseData])

    const [ isCopied, setIsCopied ] = useState(false)
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false)

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

    const SubmitButtonColorScheme = useColorModeValue("sky", "purple")

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

            {/* Result Modal */}
            <Modal isOpen={isResultModalOpen} onClose={onResultModalClose} size="xl">
                <ModalOverlay />
                <Center>
                    <ModalHeader>
                        {isResponseError ? "Snippet URL create Error" : "Snippet URL"}
                    </ModalHeader>
                </Center>
                <ModalBody>

                    { isResponseError ?
                        <>
                            <Box height="1px"/>
                            <Text pl={4}>スニペットの作成に失敗しました。</Text>
                            <Text pl={4}>時間をおいて、再度実行してください。</Text>
                            <Box height="1px"/>
                        </>
                    :
                        <FormControl
                            isReadOnly
                            label="スニペット共有用のリンクが生成されました。"
                        >
                            <Center position={"relative"}>
                                <Input
                                    type="text" 
                                    placeholder="Your snippet URL."
                                    value={snippetURL}
                                />
                                <Popover isOpen={isPopoverOpen} closeOnButton={false}>
                                    <PopoverTrigger>
                                        <Box />
                                    </PopoverTrigger>
                                    <Motion
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0}}
                                        exit={{ opacity: 0, y: -20}}
                                        transition={{ duration: 0.3}}
                                        style={{ 
                                            position: "absolute",
                                            top: "-50px",
                                            left: "-30px",
                                            zIndex: 1000
                                        }}
                                    >
                                        <PopoverContent>
                                            <PopoverBody fontSize={10}>
                                                {isCopied ? "クリップボードにコピーされました" : "コピーに失敗しました。"}
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Motion>
                                </Popover>
                                <IconButton 
                                    ml={3} 
                                    icon={<CopyIcon />}
                                    onClick={handleCopyButton}
                                />
                            </Center>
                        </FormControl>
                    }
                </ModalBody>
                <Center>
                    <ModalFooter>
                        <Button onClick={onResultModalClose}>閉じる</Button>
                    </ModalFooter>
                </Center>

            </Modal>
        </>
    )
}