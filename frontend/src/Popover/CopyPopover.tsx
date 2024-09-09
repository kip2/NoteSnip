import { Box, Motion, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@yamada-ui/react"
import { FC } from "react"

interface CopyPopoverProps {
    isPopoverOpen: boolean
    isCopied: boolean
}

const CopyPopover: FC<CopyPopoverProps> = ({ isPopoverOpen, isCopied }) => {
    return (
        <>
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
        </>
    )
}

export default CopyPopover