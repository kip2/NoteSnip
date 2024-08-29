import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { rust } from '@codemirror/lang-rust';
import { githubDark } from "@uiw/codemirror-themes-all";
import { Container, NativeSelect } from "@yamada-ui/react";

const Editor = () => {
    const [code, setCode] = useState('console.log("Hello, world")')
    const onCodeChange = useCallback((val, viewUpdate) => {
        console.log('val', val)
        setCode(val)
    }, [])

    const [language, setLanguage] = useState('rust')
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }

    const getLanguageExtension = () => {
        switch(language) {
            case 'javascript':
                return javascript({ jsx: true})
            case 'rust':
                return rust()
            default:
                return rust()
        }
    }

    return (
        <>
            <CodeMirror
                value={code}
                height="700px"
                // extensions={[javascript({ jsx: true })]}
                extensions={[getLanguageExtension()]}
                theme={githubDark}
                onChange={onCodeChange}
            />
            <Container>
                <NativeSelect onChange={handleLanguageChange} value={language}>
                    <option value="javascript">Javascript</option>
                    <option value="rust">Rust</option>
                </NativeSelect>
            </Container>
        </>

    )
}

export default Editor;