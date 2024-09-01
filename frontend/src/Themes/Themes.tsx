import { githubDark, basicDark, basicLight } from "@uiw/codemirror-themes-all";
import { NativeSelectItem } from "@yamada-ui/react";

export const themeItems: NativeSelectItem[] = [
    { label: "dark", value: "basicDark"},
    { label: "light", value: "basicLight"},
]

type ThemeOption =
    "basicDark" |
    "basicLight"

const themes = {
    basicDark: basicDark,
    basicLight: basicLight,
}

export const getTheme = (themeName: string) => {
    return themes[themeName as ThemeOption]
}