import CodeMirror from "@uiw/react-codemirror";
import { useCallback,   useState } from "react";
import { Container, Autocomplete, Center, NativeSelect, Text, Flex, GridItem, Grid } from "@yamada-ui/react";
import getLanguageExtension from "../Languages/Languages";
import { items } from "../Languages/Languages";
import { getTheme, themeItems } from "../Themes/Themes";
import { useCodeMirrorTheme } from "../Themes/ThemeContext";
import { useSelectedThemeContext } from "../Themes/ThemeProvider";
import { useCodeContext } from "./CodeProvider";
import { useLanguageContext } from "../Languages/LanguageProvider";
import { RegisterSubmitButton } from "../Button/RegisterSubmit";
import CodeEditorWrapper from "./CodeEditorWrapper";
import { useEditorHeightContext } from "./EditorHeightProvider";
import { editorHeightItems } from "./EditorHeightItems";

const Editor= () => {
    const {code, setCode, codeRef} = useCodeContext()

    const onCodeChange = useCallback((val: string) => {
        codeRef.current = val
    }, [codeRef])

    const updateCodeChange = () => {
        setCode(codeRef.current)
    }

    const { language, setLanguage } = useLanguageContext()
    const [previousValue, setPreviousValue] = useState("")
    const handleLanguageChange = (value: string) => {
        updateCodeChange()

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

        updateCodeChange()
        setSelectedTheme(theme)
        setTheme(currentTheme)
    }

    const handleEditorHeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateCodeChange()
        const dropdownValue = event.target.value
        if (dropdownValue !== "") {
            setEditorHeight(event.target.value)
        }
    }

    const { editorHeight, setEditorHeight } = useEditorHeightContext()

    return (
        <>
            <CodeEditorWrapper>
                <CodeMirror
                    value={code}
                    height={editorHeight}
                    extensions={[getLanguageExtension(language)]}
                    theme={theme}
                    onChange={onCodeChange}
                    style={{ border: "1px solid #ccc" , borderRadius: "3px"}}
                />
            </CodeEditorWrapper>
            <Container pb={0}>
                <Grid 
                    templateColumns={{ base: "1fr 1fr 1fr", md:"1fr"}}
                    gap={4}
                >
                    <GridItem>
                        <Flex alignItems="center" flexWrap="nowrap" minWidth="100%">
                            <Text className="oswald-script-regular"  fontWeight="bold" whiteSpace="nowrap">
                                Language ：
                            </Text>
                            <Autocomplete 
                                placeholder="言語を選択してください"
                                value={language}
                                header={
                                    <Center pt="2" px="3">
                                        言語を選択してください
                                    </Center>
                                }
                                onChange={handleLanguageChange} 
                                items={items}
                            >
                            </Autocomplete>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex alignItems="center" flexWrap="nowrap" minWidth="100%">
                            <Text className="oswald-script-regular" fontWeight="bold" whiteSpace="nowrap">
                                Theme ： 
                            </Text>
                            <NativeSelect
                                placeholder="テーマを選択してください"
                                value={selectedTheme}
                                items={themeItems}
                                onChange={handleThemeChange}
                            />
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex alignItems="center" flexWrap="nowrap" minWidth="100%">
                            <Text className="oswald-script-regular" fontWeight="bold" whiteSpace="nowrap">
                                Editor's Height ： 
                            </Text>
                            <NativeSelect
                                placeholder="エディタの幅を選択してください"
                                value={editorHeight}
                                items={editorHeightItems}
                                onChange={handleEditorHeightChange}
                            />
                        </Flex>

                    </GridItem>
                </Grid>
                <RegisterSubmitButton/>
            </Container>
        </>

    )
}

export default Editor;