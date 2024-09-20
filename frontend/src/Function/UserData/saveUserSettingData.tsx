import { useEditorHeightContext } from "../../UI/Editor/EditorHeightProvider"
import { useLanguageContext } from "../../Languages/LanguageProvider"
import { useThemeContext } from "../../Themes/ThemeContext"
import { UserSettingData, userSettingKey } from "./Definitions"

interface saveUserSettingProps {
    languageArg?: string
    themeArg?: string
    editorHeightArg?: string
}

export const useSaveUserSettingData = () => {
    const { language } = useLanguageContext()
    const { theme } = useThemeContext() 
    const { editorHeight } = useEditorHeightContext()

    const saveUserSetting = ({ languageArg, themeArg, editorHeightArg} : saveUserSettingProps) => {
        const saveJsonData: UserSettingData = {
            language: languageArg ? languageArg : language,
            theme: themeArg ? themeArg : theme,
            height: editorHeightArg ? editorHeightArg : editorHeight,
        }
        localStorage.setItem(userSettingKey, JSON.stringify(saveJsonData))
    }
    return saveUserSetting
}
