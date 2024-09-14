import { Box, Center, Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay } from "@yamada-ui/react"
import { FC } from "react"

interface RegisterLoadingModalProps {
    isOpen: boolean,
}

const RegisterLoadingModal: FC<RegisterLoadingModalProps> = ({ isOpen }) => {
    return(
        <>
            <Modal isOpen={isOpen}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)"/>
                <Center>
                    <ModalHeader>
                        共有URL作成中
                    </ModalHeader>
                </Center>
                <ModalBody display="flex" flexDirection="column" alignItems="center">
                    <Box height="15px"/>
                    <Loading fontSize="6xl" color="blue"/>
                    <Box height="15px"/>
                </ModalBody>
                <ModalFooter />
            </Modal>
        </>
    )
}

export default RegisterLoadingModal