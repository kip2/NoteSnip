import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { githubDark } from "@uiw/codemirror-themes-all";
import { Container, NativeSelect} from "@yamada-ui/react";
import getLanguageExtension from "./Languages/Languages";
import { items } from "./Languages/NativeItems";
import { defaultSnippet } from "./Languages/DefaultSnippet";

const Editor = () => {
    const [code, setCode] = useState(defaultSnippet)
    const onCodeChange = useCallback((val: string) => {
        console.log('val', val)
        setCode(val)
    }, [])

    const [language, setLanguage] = useState('rust')
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value)
    }



    return (
        <>
            <CodeMirror
                value={code}
                height="700px"
                extensions={[getLanguageExtension(language)]}
                theme={githubDark}
                onChange={onCodeChange}
            />
            <Container>
                <NativeSelect 
                    placeholder="言語を選択してください"
                    onChange={handleLanguageChange} 
                    items={items}
                >
                </NativeSelect>
            </Container>
        </>

    )
}

export default Editor;