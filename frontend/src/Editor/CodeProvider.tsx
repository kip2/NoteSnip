import React, { createContext, useContext, useState, ReactNode, useRef  } from "react";
import { defaultSnippet } from "../Languages/DefaultSnippet";

interface CodeContextType {
    code: string;
    setCode: (theme: string) => void;
    codeRef: React.MutableRefObject<string>;
}

const CodeContext = createContext<CodeContextType>({
    code: defaultSnippet,
    setCode: () => {},
    codeRef: { current: defaultSnippet },
});

export const CodeProvider = ({ children }: { children: ReactNode }) => {
    const [code, setCode] = useState<string>(defaultSnippet);
    const codeRef = useRef<string>(defaultSnippet)
    
    return (
        <CodeContext.Provider value={{ code, setCode, codeRef}}>
            {children}
        </CodeContext.Provider>
    );
};

export const useCodeContext = () => {
    return useContext(CodeContext);
};
