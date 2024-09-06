import { Box, Button, Center, useColorMode, ColorMode, useColorModeValue} from "@yamada-ui/react"
import { useCodeMirrorTheme } from "../Themes/ThemeContext"
import { getTheme } from "../Themes/Themes"
import { useSelectedThemeContext } from "../Themes/ThemeProvider"
import { useEffect } from "react"
import { MoonIcon, SunMoonIcon } from "@yamada-ui/lucide"


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

    const ColorModeButtunColorSchema = useColorModeValue("blue", "indigo")

    return(
        <>
            <Center>
                <Box display="flex" gap="md">
                    <Button 
                        colorScheme={ColorModeButtunColorSchema}
                        leftIcon={<SunMoonIcon/>}
                        onClick={()=>handleColorModeChange("light")} >
                            light
                    </Button>
                    <Button 
                        colorScheme={ColorModeButtunColorSchema}
                        leftIcon={<MoonIcon/>}
                        onClick={() => handleColorModeChange("dark")}>
                            dark
                    </Button>
                </Box>
            </Center>
        </>
    )
}