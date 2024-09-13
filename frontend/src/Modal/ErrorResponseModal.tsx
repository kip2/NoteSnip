import { Box, Button, Center, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, Text } from "@yamada-ui/react"
import { FC } from "react"
import { useButtonColorScheme } from "../Button/ButtonColorScheme"

interface ErrorReponseModalProps {
    isOpen: boolean,
    onClose: () => void,
    errorTitle: string,
    errorResponse: string,
}

const ErrorReponseModal: FC<ErrorReponseModalProps> = ({ isOpen, onClose, errorTitle, errorResponse}) => {
    const buttonColorScheme = useButtonColorScheme()

    return (
        <>
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
                            {errorResponse}
                        </Text>
                    </Box>
                </ModalBody>
                <Center>
                    <ModalFooter>
                        <Button 
                            colorScheme={buttonColorScheme}
                            onClick={onClose}>
                            閉じる
                        </Button>
                    </ModalFooter>
                </Center>
            </Modal>
        </>
    )
}

export default ErrorReponseModal