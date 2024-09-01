import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { githubDark, basicDark } from "@uiw/codemirror-themes-all";
import { Container, Autocomplete, Center } from "@yamada-ui/react";
import getLanguageExtension from "./Languages/Languages";
import { items } from "./Languages/Languages";
import { defaultLanguage, defaultSnippet } from "./Languages/DefaultSnippet";

const Editor = () => {
    const [code, setCode] = useState(defaultSnippet)
    const onCodeChange = useCallback((val: string) => {
        setCode(val)
    }, [])

    const [language, setLanguage] = useState(defaultLanguage)
    const [previousValue, setPreviousValue] = useState("")
    const handleLanguageChange = (value: string) => {
        if (value.length >= previousValue.length) {
            setLanguage(value)
        }
        setPreviousValue(value)
    }

    return (
        <>
            <CodeMirror
                value={code}
                height="700px"
                extensions={[getLanguageExtension(language)]}
                theme={basicDark}
                onChange={onCodeChange}
            />
            <Container>
                <Autocomplete 
                    placeholder="言語を選択してください"
                    header={
                        <Center pt="2" px="3">
                            "言語を選択してください"
                        </Center>
                    }
                    onChange={handleLanguageChange} 
                    items={items}
                >
                </Autocomplete>
            </Container>
        </>

    )
}

export default Editor;