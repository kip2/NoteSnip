import { createContext, ReactNode, useContext, useState } from "react"

interface EditorHeightContextType {
    editorHeight: string,
    setEditorHeight: (height: string) => void,
}

const defaultEditorHeight = "700px"

const EditorHeightContext = createContext<EditorHeightContextType>({
    editorHeight: defaultEditorHeight,
    setEditorHeight: () => {},
})


export const EditorHeightProvider = ({ children }: { children: ReactNode }) => {
    const [ editorHeight, setEditorHeight ] = useState<string>(defaultEditorHeight)

    return (
        <EditorHeightContext.Provider value={{ editorHeight, setEditorHeight }}>
            {children}
        </EditorHeightContext.Provider>
    )
}

export const useEditorHeightContext = () => {
    return useContext(EditorHeightContext)
}