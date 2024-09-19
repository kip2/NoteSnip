import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type ThemeContextType = {
    theme: string
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getSystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? "dark" : "light"
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme ] = useState(getSystemTheme())

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleChange = (e: MediaQueryListEvent) => {
            const changeTheme = e.matches ? "dark" : "light"
            setTheme(changeTheme)
        }

        setTheme(mediaQuery.matches ? "dark" : "light")

        mediaQuery.addEventListener("change", handleChange)

        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [setTheme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useCodeMirrorTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}