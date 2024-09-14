import { Box, Center, NativeSelect, NativeSelectItem } from "@yamada-ui/react"
import { useExpirationContext } from "./ExpirationProvider"

export const defaultExpirationValue = "10min"

export const ExpirationPulldown = () => {

    const items: NativeSelectItem[] = [
        { label: "10分", value: "10min"},
        { label: "1時間", value: "1hour"},
        { label: "1日", value: "1day" },
        { label: "1週間", value: "1week" },
        { label: "ずっと", value: "eternal" },
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
                        maxW="xs"
                        onChange={handleExpirationChange}
                        items={items} />
                </Box>
            </Center>
        </>
    )
}