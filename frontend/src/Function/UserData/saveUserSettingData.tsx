import { useEditorHeightContext } from "../../Editor/EditorHeightProvider"
import { useLanguageContext } from "../../Languages/LanguageProvider"
import { useThemeContext } from "../../Themes/ThemeContext"
import { UserSettingData, userSettingKey } from "./Definitions"

export const useSaveUserSettingData = () => {
    const { language } = useLanguageContext()
    const { theme } = useThemeContext() 
    const { editorHeight } = useEditorHeightContext()

    const saveUserSetting = () => {
        if (language || theme || editorHeight ) {
            const saveJsonData: UserSettingData = {
                language: language,
                theme: theme,
                height: editorHeight,
            }
            console.log(saveJsonData)
            localStorage.setItem(userSettingKey, JSON.stringify(saveJsonData))
        }
    }
    return saveUserSetting
}
