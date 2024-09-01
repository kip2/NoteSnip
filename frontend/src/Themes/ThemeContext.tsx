import { githubDark } from "@uiw/codemirror-themes-all"
import { Extension } from "@uiw/react-codemirror"
import { createContext, ReactNode, useContext, useState } from "react"

type ThemeContextType = {
    theme: Extension
    setTheme: (theme: Extension) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme ] = useState(githubDark)

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