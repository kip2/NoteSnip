import { useEditorHeightContext } from "../../Editor/EditorHeightProvider"
import { useLanguageContext } from "../../Languages/LanguageProvider"
import { useCodeMirrorTheme } from "../../Themes/ThemeContext"
import { findKeyByValue } from "../../Themes/Themes"
import { UserSettingData, userSettingKey } from "./Definitions"

export const useSaveUserSettingData = () => {
    const { language } = useLanguageContext()
    const { theme } = useCodeMirrorTheme() 
    const { editorHeight } = useEditorHeightContext()

    const saveUserSetting = () => {
        const saveTheme = findKeyByValue(theme) 
        if (language || saveTheme || editorHeight ) {
            const saveJsonData: UserSettingData = {
                language: language,
                theme: saveTheme,
                height: editorHeight,
            }
            console.log(saveJsonData)
            localStorage.setItem(userSettingKey, JSON.stringify(saveJsonData))
        }
    }
    return saveUserSetting
}
