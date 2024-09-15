import { Box,  Center, useColorMode, ColorMode } from "@yamada-ui/react"
import { useCodeMirrorTheme } from "../Themes/ThemeContext"
import { getTheme } from "../Themes/Themes"
import { useSelectedThemeContext } from "../Themes/ThemeProvider"
import { useEffect } from "react"
import "./ColorModeButton.css"

export const ColorModeButton = () => {
    const { setTheme } = useCodeMirrorTheme()
    const { colorMode, changeColorMode } = useColorMode()
    const { setSelectedTheme } = useSelectedThemeContext()

    useEffect(() => {
        const systemPreferDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const defaultMode = systemPreferDark ? "dark" : "light"
        changeColorMode(defaultMode)
    }, [changeColorMode])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleSystemColorModeChange = (e: MediaQueryListEvent) => {
            const newMode = e.matches ? "dark" : "light"
            changeColorMode(newMode as ColorMode)
        }

        mediaQuery.addEventListener("change", handleSystemColorModeChange)

        return () => {
            mediaQuery.removeEventListener("change", handleSystemColorModeChange)
        }
    }, [changeColorMode])

    useEffect(() => {
        const currentTheme = getTheme(colorMode as string)
        setSelectedTheme(colorMode as string)
        setTheme(currentTheme)
    }, [colorMode, setSelectedTheme, setTheme ])

    const toggleColorMode = () => {
        const newMode = colorMode === "light" ? "dark" : "light"
        changeColorMode(newMode as ColorMode)
        const currentTheme = getTheme(newMode as string)
        setTheme(currentTheme)
    }

    return(
        <>
            <Center>
                <Box display="flex" gap="md">
                    <button 
                        className={`toggle-btn ${colorMode === 'dark' ? 'toggled' : ''}`}
                        onClick={toggleColorMode}
                    >
                        <div className="sun-rays"/>
                        <div className="main-circle"/>
                    </button>
                </Box>
            </Center>
        </>
    )
}