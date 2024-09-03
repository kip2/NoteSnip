import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SelectedThemeContextType {
    selectedTheme: string;
    setSelectedTheme: (theme: string) => void;
}

const SelectedThemeContext = createContext<SelectedThemeContextType>({
    selectedTheme: "dark",
    setSelectedTheme: () => {},
});

export const SelectedThemeProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTheme, setSelectedTheme] = useState<string>("dark");
    useEffect(() => {
        console.log("ThemeProvider selectedTheme:", selectedTheme);
    }, [selectedTheme]);

    return (
        <SelectedThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
            {children}
        </SelectedThemeContext.Provider>
    );
};

export const useSelectedThemeContext = () => {
    return useContext(SelectedThemeContext);
};
