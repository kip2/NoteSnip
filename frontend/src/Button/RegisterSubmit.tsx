import { Box, Button, Center, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@yamada-ui/react"
import { useExpirationContext } from "../Pulldown/ExpirationProvider"
import { useState } from "react"
import { useLanguageContext } from "../Languages/LanguageProvider"
import { useCodeContext } from "../EditorCode/CodeProvider"

export const RegisterSubmit = () => {
    const { code } = useCodeContext()
    const { language } = useLanguageContext()
    const [ responseData, setResponseData ] = useState<string | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { expiration } = useExpirationContext()

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
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error("Response text:", text)
                    })
                }
                return response.json()
            })
            .then(data => {
                setResponseData(JSON.stringify(data, null, 2))
                onOpen()
            })
            .catch(error => console.error('Error fetching data:', error))
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
                        レスポンス
                    </ModalHeader>
                </Center>
                <ModalBody>
                    <pre>{responseData}</pre>
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