import { Box, Button, Center, useColorMode, ColorMode} from "@yamada-ui/react"
import { useCodeMirrorTheme } from "../Themes/ThemeContext"
import { getTheme } from "../Themes/Themes"
import { useSelectedThemeContext } from "../Themes/ThemeProvider"
import { useEffect } from "react"


export const ColorModeButton = () => {
    const { setTheme } = useCodeMirrorTheme()
    const { colorMode, changeColorMode } = useColorMode()
    const { setSelectedTheme } = useSelectedThemeContext()

    useEffect(() => {
        const currentTheme = getTheme(colorMode as string)
        setSelectedTheme(colorMode as string)
        setTheme(currentTheme)
    }, [colorMode, setSelectedTheme, setTheme])

    const handleColorModeChange = (mode: ColorMode) => {
        changeColorMode(mode)
        const currentTheme = getTheme(mode as string)
        setTheme(currentTheme)
    }

    return(
        <>
            <Center>
                <Box display="flex" gap="md">
                    <Button onClick={()=>handleColorModeChange("light")}>ライトモード</Button>
                    <Button onClick={() => handleColorModeChange("dark")}>ダークモード</Button>
                </Box>
            </Center>
        </>
    )
}