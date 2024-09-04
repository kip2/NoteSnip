import { createContext, useContext, useState, ReactNode } from "react";
import { defaultSnippet } from "../Languages/DefaultSnippet";

interface CodeContextType {
    code: string;
    setCode: (theme: string) => void;
}

const CodeContext = createContext<CodeContextType>({
    code: defaultSnippet,
    setCode: () => {},
});

export const CodeProvider = ({ children }: { children: ReactNode }) => {
    const [code, setCode] = useState<string>(defaultSnippet);

    return (
        <CodeContext.Provider value={{ code, setCode }}>
            {children}
        </CodeContext.Provider>
    );
};

export const useCodeContext = () => {
    return useContext(CodeContext);
};
