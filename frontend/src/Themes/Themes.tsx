import {  
    basicDark, githubLight , 
    abcdef, abyss, androidstudio, andromeda, atomone, aura, bbedit, bespin, consoleDark, consoleLight, copilot, duotoneDark, duotoneLight, dracula, darcula, eclipse, githubDark, gruvboxDark, gruvboxLight, kimbie, material, noctisLilac, nord, okaidia, quietlight,
} from "@uiw/codemirror-themes-all";
import { NativeSelectItem } from "@yamada-ui/react";

export const themeItems: NativeSelectItem[] = [
    { label: "dark", value: "dark"},
    { label: "light", value: "light"},
    { label: "abcdef", value: "abcdef"},
    { label: "abyss", value: "abyss"},
    { label: "androidstudio", value: "androidstudio"},
    { label: "andromeda", value: "andromeda"},
    { label: "atomone", value: "atomone"},
    { label: "aura", value: "aura"},
    { label: "bbedit", value: "bbedit"},
    { label: "bespin", value: "bespin"},
    { label: "consoleDark", value: "consoleDark"},
    { label: "consoleLight", value: "consoleLight"},
    { label: "copilot", value: "copilot"},
    { label: "duotoneDark", value: "duotoneDark"},
    { label: "duotoneLight", value: "duotoneLight"},
    { label: "dracula", value: "dracula"},
    { label: "darcula", value: "darcula"},
    { label: "eclipse", value: "eclipse"},
    { label: "githubDark", value: "githubDark"},
    { label: "githubLight", value: "githubLight"},
    { label: "gruvboxDark", value: "gruvboxDark"},
    { label: "gruvboxLight", value: "gruvboxLight"},
    { label: "kimbie", value: "kimbie"},
    { label: "material", value: "material"},
    { label: "noctisLilac", value: "noctisLilac"},
    { label: "nord", value: "nord"},
    { label: "okaidia", value: "okaidia"},
    { label: "quietlight", value: "quietlight"},
]

type ThemeOption =
    "dark" |
    "light" |
    "abcdef" |
    "abyss" |
    "androidstudio" |
    "andromeda" |
    "atomone" |
    "aura" |
    "bbedit" |
    "bespin"|
    "consoleDark"  |
    "consoleLight" |
    "copilot"|
    "duotoneDark" |
    "duotoneLight" |
    "dracula" |
    "darcula" |
    "eclipse" |
    "githubDark" |
    "githubLight" |
    "gruvboxDark" |
    "gruvboxLight"|
    "kimbie" |
    "material"|
    "noctisLilac"|
    "nord"|
    "okaidia"|
    "quietlight"


const themes = {
    dark: basicDark,
    light: githubLight,
    abcdef: abcdef,
    abyss: abyss,
    androidstudio: androidstudio,
    andromeda: andromeda,
    atomone: atomone,
    aura: aura,
    bbedit: bbedit,
    bespin: bespin,
    consoleDark: consoleDark,
    consoleLight: consoleLight,
    copilot: copilot,
    duotoneDark: duotoneDark,
    duotoneLight: duotoneLight,
    dracula: dracula,
    darcula: darcula,
    eclipse: eclipse,
    githubDark: githubDark,
    githubLight: githubLight,
    gruvboxDark: gruvboxDark,
    gruvboxLight: gruvboxLight,
    kimbie: kimbie,
    material: material,
    noctisLilac: noctisLilac,
    nord: nord,
    okaidia: okaidia,
    quietlight: quietlight,
}

export const getTheme = (themeName: string) => {
    return themes[themeName as ThemeOption]
}