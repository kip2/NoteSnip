import { Box, Button, Center, FormControl,  Input, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay , Text } from "@yamada-ui/react"
import { FC } from "react"
import { useButtonColorScheme } from "../Button/ButtonColorScheme"
import CopyButton from "../Button/CopyButton"

interface ResultModalProps {
    isOpen: boolean
    onClose: () => void
    isError: boolean
    snippetURL: string
    isCopied: boolean
    setIsCopied: (value: boolean) => void
    isPopoverOpen: boolean
    setIsPopoverOpen: (value: boolean) => void
}

const ResultModal: FC<ResultModalProps> = ({ isOpen, onClose, isError, snippetURL, isCopied, setIsCopied,  isPopoverOpen, setIsPopoverOpen}) => {
    const colorScheme =  useButtonColorScheme()

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size
            ="xl">
                <ModalOverlay />
                <Center>
                    <ModalHeader>
                        {isError ? "Snippet URL create Error" : "Snippet URL"}
                    </ModalHeader>
                </Center>
                <ModalBody>

                    { isError ?
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
                                <CopyButton
                                    isCopied={isCopied}
                                    setIsCopied={setIsCopied}
                                    isPopoverOpen={isPopoverOpen}
                                    setIsPopoverOpen={setIsPopoverOpen}
                                    copyText={snippetURL}
                                />
                            </Center>
                        </FormControl>
                    }
                </ModalBody>
                <Center>
                    <ModalFooter>
                        <Button 
                            colorScheme={colorScheme}
                            onClick={onClose}
                        >
                            閉じる
                        </Button>
                    </ModalFooter>
                </Center>

            </Modal>
        </>
    )
}

export default ResultModal