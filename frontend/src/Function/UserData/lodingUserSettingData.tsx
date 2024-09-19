import { useEditorHeightContext } from "../../Editor/EditorHeightProvider"
import { useLanguageContext } from "../../Languages/LanguageProvider"
import { useThemeContext } from "../../Themes/ThemeContext"
import { userSettingKey } from "./Definitions"

export const useLoadingUserSettingData = () => {
    const { setLanguage } = useLanguageContext()
    const { theme, setTheme } = useThemeContext()
    const { setEditorHeight } = useEditorHeightContext()
    
    const loadUserSetting = () => {
        const data = localStorage.getItem(userSettingKey)
        console.log(data)
        if (data) {
            const loadData = JSON.parse(data)
            setLanguage(loadData.language)
            if (theme !== loadData.theme) {
                setTheme(loadData.theme)
            }
            setEditorHeight(loadData.height)
        }
    }
    return loadUserSetting
}