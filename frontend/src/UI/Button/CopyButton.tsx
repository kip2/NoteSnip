import { IconButton} from "@yamada-ui/react"
import { CopyIcon } from "@yamada-ui/lucide"
import CopyPopover from "../Popover/CopyPopover"
import { FC } from "react"

interface CopyButtonProps {
    isCopied: boolean
    setIsCopied: (value: boolean) => void
    isPopoverOpen: boolean
    setIsPopoverOpen: (value: boolean) => void
    copyText: string
}

const CopyButton: FC<CopyButtonProps> = ({ isCopied, setIsCopied, isPopoverOpen, setIsPopoverOpen,  copyText }) => {

    const handleCopyButton = () => {
        navigator.clipboard.writeText(copyText)
            .then(() => {
                handleCopySuccess()
            })
            .catch(() => {
                handleCopyFailure()
            }) 
    }

    const handleCopySuccess = () => {
        setIsCopied(true)
        togglePopover()
    }

    const handleCopyFailure = () => {
        setIsCopied(false)
        togglePopover()
    }

    const togglePopover = () => {
        setIsPopoverOpen(true)
        setTimeout(() => setIsPopoverOpen(false), 2000)
    }

    
    return (
        <>
            <CopyPopover isPopoverOpen={isPopoverOpen} isCopied={isCopied}/>
            <IconButton 
                    ml={3} 
                    icon={<CopyIcon />}
                    onClick={handleCopyButton}
            />
        </>
    );
}

export default CopyButton