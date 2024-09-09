import { Box, Button, Center, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, Text } from "@yamada-ui/react"
import { ExpirationPulldown } from "../Pulldown/Expiration"
import { FC } from "react"

interface SubmitSettingModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: () => void
}

const SubmitSettingModal: FC<SubmitSettingModalProps> = ({ isOpen, onClose, onSubmit}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay></ModalOverlay>
            <Center>
                <ModalHeader>
                    スニペットの送信設定
                </ModalHeader>
            </Center>
            <ModalBody display="flex" flexDirection="column" alignItems="center">
                <Box height="5px" />
                <Text>1. 送信するスニペットの保存期間を選択してください。</Text>
                <ExpirationPulldown/>
                <Box height="5px" />
                <Text>2. 送信ボタンを押すと、スニペット共有用のURLが作成されます。</Text>
                <Box height="5px" />
            </ModalBody>
            <Center>
                <ModalFooter>
                    <Button onClick={onSubmit}>送信</Button>
                    <Button onClick={onClose}>閉じる</Button>
                </ModalFooter>
            </Center>
        </Modal>
    )
}

export default SubmitSettingModal