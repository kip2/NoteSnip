import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, Text } from "@yamada-ui/react"
import { useButtonColorScheme } from "../Button/ButtonColorScheme"
import { FC } from "react"

interface HelpModalProps {
    isOpen: boolean
    onClose: () => void
}

const HelpModal:FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const buttonColor = useButtonColorScheme()

    return (
        <Modal isOpen={isOpen} size="xl">
            <ModalOverlay></ModalOverlay>
            <Center>
                <ModalHeader>
                    このサイトの使い方
                </ModalHeader>
            </Center>
            <ModalCloseButton onClick={onClose}/>
            <ModalBody display="flex" flexDirection="column" alignItems="center">
                <Box height="5px" />
                    <Text>URLを用いて、コードを他人と共有できるサービスとなっています。</Text>
                    <Text>共有URLを作成して、コードを友達と共有しよう！</Text>
                <Box height="5px" />
                    <Text fontWeight="bold">使い方</Text>
                <Box height="5px" />
                    <Text>1. エディターで編集を行うか、ローカルで編集したコードなどをエディターに貼り付けてください。</Text>
                    <Text>2. 送信ボタンを押すと、スニペット共有用のURLが作成されます。</Text>
                    <Text>3. URLを共有すると、コードが共有されます。</Text>
                    <Text>4. また、言語のハイライト、エディターのテーマ、エディターの高さは変更が可能となっています。</Text>
            </ModalBody>
            <Center>
                <ModalFooter>
                    <Button
                        colorScheme={buttonColor}
                        onClick={onClose}
                    >閉じる</Button>
                </ModalFooter>
            </Center>
        </Modal>
    )
}

export default HelpModal