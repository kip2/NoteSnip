import { FC } from "react"
import { useButtonColorScheme } from "../Button/ButtonColorScheme"
import { Box, Button, Center, Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay } from "@yamada-ui/react"

interface GetLoadingModalProps {
    isOpen: boolean,
    onClick: () => void,
}

const GetLoadingModal: FC<GetLoadingModalProps> = ({ isOpen, onClick }) => {
    const buttonColorScheme = useButtonColorScheme()

    return (
        <>
            <Modal isOpen={isOpen}>
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
                        onClick={onClick}>
                        中断
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default GetLoadingModal