import { createContext, useContext, useState, ReactNode } from "react";
import { defaultLanguage } from "./DefaultSnippet";

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: defaultLanguage,
    setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>(defaultLanguage);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => {
    return useContext(LanguageContext);
};
