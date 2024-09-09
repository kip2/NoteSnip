import { Box, Button, Center, useColorMode, ColorMode} from "@yamada-ui/react"
import { useCodeMirrorTheme } from "../Themes/ThemeContext"
import { getTheme } from "../Themes/Themes"
import { useSelectedThemeContext } from "../Themes/ThemeProvider"
import { useEffect } from "react"
import { MoonIcon, SunMoonIcon } from "@yamada-ui/lucide"
import { useButtonColorScheme } from "./ButtonColorScheme"


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

    const ColorModeButtunColorScheme = useButtonColorScheme()

    return(
        <>
            <Center>
                <Box display="flex" gap="md">
                    <Button 
                        colorScheme={ColorModeButtunColorScheme}
                        leftIcon={<SunMoonIcon/>}
                        onClick={()=>handleColorModeChange("light")} >
                            light
                    </Button>
                    <Button 
                        colorScheme={ColorModeButtunColorScheme}
                        leftIcon={<MoonIcon/>}
                        onClick={() => handleColorModeChange("dark")}>
                            dark
                    </Button>
                </Box>
            </Center>
        </>
    )
}