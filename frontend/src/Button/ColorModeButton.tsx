import { Box,  Center, useColorMode, ColorMode } from "@yamada-ui/react"
import { useThemeContext } from "../Themes/ThemeContext"
import { useEffect } from "react"
import "./ColorModeButton.css"

export const ColorModeButton = () => {
    const { setTheme } = useThemeContext()
    const { colorMode, changeColorMode } = useColorMode()

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

    const toggleColorMode = () => {
        const newMode = colorMode === "light" ? "dark" : "light"
        changeColorMode(newMode as ColorMode)
        setTheme(newMode as string)
    }

    return(
        <>
            <Center>
                <Box display="flex" gap="md">
                    <button 
                        className={`toggle-btn ${colorMode === 'light' ? 'toggled' : ''}`}
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