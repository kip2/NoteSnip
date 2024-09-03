import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedThemeContextType {
    selectedTheme: string;
    setSelectedTheme: (theme: string) => void;
}

const SelectedThemeContext = createContext<SelectedThemeContextType>({
    selectedTheme: "",
    setSelectedTheme: () => {},
});

export const SelectedThemeProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTheme, setSelectedTheme] = useState<string>("");

    return (
        <SelectedThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
            {children}
        </SelectedThemeContext.Provider>
    );
};

export const useSelectedThemeContext = () => {
    return useContext(SelectedThemeContext);
};
