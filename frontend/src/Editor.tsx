import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { githubDark, basicDark, basicLight } from "@uiw/codemirror-themes-all";
import { Container, Autocomplete, Center, NativeSelect, NativeSelectItem } from "@yamada-ui/react";
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

    // todo: デフォルトで渡すものは、darkとlightでテーマを切り替えて提供すること
    // todo: システムのテーマによって変えること
    const [theme, setTheme] = useState(basicDark)
    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTheme = event.target.value
        setTheme(getTheme(selectedTheme))
    }

    const themeItems: NativeSelectItem[] = [
        { label: "dark", value: "basikDark"},
        { label: "light", value: "basikLight"},
    ]

    type ThemeOption =
        "dark" |
        "light"

    const themes = {
        dark: basicDark,
        light: basicLight,
    }

    const getTheme = (themeName: string) => {
        return themes[themeName as ThemeOption]
    }

    return (
        <>
            <CodeMirror
                value={code}
                height="700px"
                extensions={[getLanguageExtension(language)]}
                theme={theme}
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
                <NativeSelect
                    placeholder="テーマを選択してください"
                    items={themeItems}
                    onChange={handleThemeChange}
                />
            </Container>
            <Container>
            </Container>
        </>

    )
}

export default Editor;