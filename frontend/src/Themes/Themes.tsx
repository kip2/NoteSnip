import { githubDark, basicDark, basicLight } from "@uiw/codemirror-themes-all";
import { NativeSelectItem } from "@yamada-ui/react";

export const themeItems: NativeSelectItem[] = [
    { label: "dark", value: "dark"},
    { label: "light", value: "light"},
]

type ThemeOption =
    "dark" |
    "light"

const themes = {
    dark: basicDark,
    light: basicLight,
}

export const getTheme = (themeName: string) => {
    return themes[themeName as ThemeOption]
}