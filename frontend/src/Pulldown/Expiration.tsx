import { Box, Center, NativeSelect, NativeSelectItem } from "@yamada-ui/react"
import { useExpirationContext } from "./ExpirationProvider"

export const ExpirationPulldown = () => {

    const items: NativeSelectItem[] = [
        { label: "10min", value: "10min"},
        { label: "1hour", value: "1hour"},
        { label: "1day", value: "1day" },
        { label: "1week", value: "1week" },
        { label: "eternal", value: "eternal" },
    ]
    const { setExpiration} = useExpirationContext()

    const handleExpirationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExpiration(event.target.value)
    }

    return(
        <>
            <Center>
                <Box>
                    <NativeSelect
                        focusBorderColor='green.500'
                        maxW="xs"
                        placeholder='有効期限を選択' 
                        onChange={handleExpirationChange}
                        items={items} />
                </Box>
            </Center>
        </>
    )
}