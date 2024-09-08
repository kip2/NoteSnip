import { Box, Button, Center, FormControl, Input, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverBody, Motion } from "@yamada-ui/react"
import { useExpirationContext } from "../Pulldown/ExpirationProvider"
import { useEffect, useState } from "react"
import { useLanguageContext } from "../Languages/LanguageProvider"
import { useCodeContext } from "../Editor/CodeProvider"
import { CopyIcon } from "@yamada-ui/lucide"

export const RegisterSubmit = () => {
    const { code } = useCodeContext()
    const { language } = useLanguageContext()
    const [ responseData, setResponseData ] = useState<string | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { expiration } = useExpirationContext()
    const [ isResponseError, setIsResponseError ] = useState(false)
    const [ snippetURL, setSnippetURL ] = useState("")

    const handleSubmitButton = () => {
        const requestJsonData = {
            snippet: code,
            snippet_language: language,
            expiration_stat: expiration,
        }


        fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestJsonData)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setResponseData(JSON.stringify(data, null, 2))
                if (data.error) {
                    setIsResponseError(true)
                } else {
                    setIsResponseError(false)
                }
                onOpen()
            })
            .catch(() => {
                setIsResponseError(true)
                onOpen()
            })
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
                setIsCopied(true)
                setIsPopoverOpen(true)
                setTimeout(() => setIsPopoverOpen(false), 3000)
            })
            .catch(() => {
                setIsCopied(false)
                setIsPopoverOpen(true)
                setTimeout(() => setIsPopoverOpen(false), 3000)
            }) 
    }

    return(
        <>
            <Center>
                <Box>
                    <Center>
                        <Button onClick={handleSubmitButton}>送信</Button>
                    </Center>
                </Box>
            </Center>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                            label="Copy your snippet URL."
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
                        <Button onClick={onClose}>閉じる</Button>
                    </ModalFooter>
                </Center>

            </Modal>
        </>
    )
}