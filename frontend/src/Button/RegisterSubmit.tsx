import { Box, Button, Center, FormControl, Input, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from "@yamada-ui/react"
import { useExpirationContext } from "../Pulldown/ExpirationProvider"
import { useState } from "react"
import { useLanguageContext } from "../Languages/LanguageProvider"
import { useCodeContext } from "../Editor/CodeProvider"

export const RegisterSubmit = () => {
    const { code } = useCodeContext()
    const { language } = useLanguageContext()
    const [ responseData, setResponseData ] = useState<string | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { expiration } = useExpirationContext()
    const [ isResponseError, setIsResponseError ] = useState(false)

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

    const getUrlFromResponse = () => {
        if (!responseData) return ""
        const parseData = JSON.parse(responseData)
        return parseData.url || ""
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
                            <Box height="10px"/>
                            <Text pl={4}>スニペットの作成に失敗しました。</Text>
                            <Text pl={4}>時間をおいて、再度実行してください。</Text>
                            <Box height="10px"/>
                        </>
                    :
                        <FormControl
                            isReadOnly
                            label="Copy your snippet URL."
                        >
                            <Input
                                type="text" 
                                placeholder="Your snippet URL."
                                value={getUrlFromResponse()}
                            />
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