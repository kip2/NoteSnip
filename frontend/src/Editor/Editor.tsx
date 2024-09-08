import CodeMirror from "@uiw/react-codemirror";
import { useCallback,  useState } from "react";
import { Container, Autocomplete, Center, NativeSelect } from "@yamada-ui/react";
import getLanguageExtension from "../Languages/Languages";
import { items } from "../Languages/Languages";
import { getTheme, themeItems } from "../Themes/Themes";
import { useCodeMirrorTheme } from "../Themes/ThemeContext";
import { useSelectedThemeContext } from "../Themes/ThemeProvider";
import { useCodeContext } from "./CodeProvider";
import { useLanguageContext } from "../Languages/LanguageProvider";

const Editor = () => {
    const {code, setCode} = useCodeContext()
    const onCodeChange = useCallback((val: string) => {
        setCode(val)
    }, [setCode])

    const { language, setLanguage } = useLanguageContext()
    const [previousValue, setPreviousValue] = useState("")
    const handleLanguageChange = (value: string) => {
        if (value.length >= previousValue.length) {
            setLanguage(value)
        }
        setPreviousValue(value)
    }

    const { theme, setTheme } = useCodeMirrorTheme()
    const { selectedTheme, setSelectedTheme } = useSelectedThemeContext()

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = event.target.value
        const currentTheme = getTheme(theme)
        setSelectedTheme(theme)
        setTheme(currentTheme)
    }

    return (
        <>
            <CodeMirror
                value={code}
                height="700px"
                extensions={[getLanguageExtension(language)]}
                theme={theme}
                onChange={onCodeChange}
                style={{ border: "1px solid #ccc" }}
            />
            <Container>
                <Autocomplete 
                    placeholder="言語を選択してください"
                    value={language}
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
                    value={selectedTheme}
                    items={themeItems}
                    onChange={handleThemeChange}
                />
            </Container>
        </>

    )
}

export default Editor;