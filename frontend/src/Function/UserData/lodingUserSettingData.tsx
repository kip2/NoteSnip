import { useEditorHeightContext } from "../../Editor/EditorHeightProvider"
import { useLanguageContext } from "../../Languages/LanguageProvider"
import { useCodeMirrorTheme } from "../../Themes/ThemeContext"
import { userSettingKey } from "./Definitions"

export const useLoadingUserSettingData = () => {
    const { setLanguage } = useLanguageContext()
    const { setTheme } = useCodeMirrorTheme()
    const { setEditorHeight } = useEditorHeightContext()
    
    const loadUserSetting = () => {
        const data = localStorage.getItem(userSettingKey)
        console.log(data)
        if (data) {
            const loadData = JSON.parse(data)
            setLanguage(loadData.language)
            setTheme(loadData.theme)
            setEditorHeight(loadData.height)
        }
    }
    return loadUserSetting
}