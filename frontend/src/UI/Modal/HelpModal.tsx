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
                    <Text>共有URLを作成して、コードを友達と共有しよう！</Text>
                    <Box height="5px" />
                    <Text fontWeight="bold">=== 使い方 ===</Text>
                    <Text>1. エディターにコードを書く。</Text>
                    <Text>2. 「共有URL作成」ボタンを押す。</Text>
                    <Text>3. 保存期間を設定する。</Text>
                    <Text>4. 「送信」ボタンをクリック！</Text>
                    <Text>5. URLを友達と共有しよう！</Text>
                    <Box height="5px" />
                    <Text fontWeight="bold">=== 補足 ===</Text>
                    <Text>エディタの言語ハイライト、テーマ、高さは変更できます。</Text>
                    <Box height="5px" />
                    <Text>Happy Hacking!</Text>
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