import {  
    basicDark, githubLight , 
    abcdef, abyss, androidstudio, andromeda, atomone, aura, bbedit, bespin, consoleDark, consoleLight, copilot, duotoneDark, duotoneLight, dracula, darcula, eclipse, githubDark, gruvboxDark, gruvboxLight, kimbie, material, noctisLilac, nord, okaidia, quietlight, red, solarizedDark, solarizedLight, sublime, tokyoNight, tokyoNightDay, tokyoNightStorm, tomorrowNightBlue, vscodeDark, vscodeLight, whiteDark, whiteLight, xcodeDark, xcodeLight
} from "@uiw/codemirror-themes-all";
import { Extension } from "@uiw/react-codemirror";
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
    { label: "gruvboxDark", value: "gruvboxDark"},
    { label: "gruvboxLight", value: "gruvboxLight"},
    { label: "kimbie", value: "kimbie"},
    { label: "material", value: "material"},
    { label: "noctisLilac", value: "noctisLilac"},
    { label: "nord", value: "nord"},
    { label: "okaidia", value: "okaidia"},
    { label: "quietlight", value: "quietlight"},
    { label: "red", value: "red"},
    { label: "solarizedDark", value: "solarizedDark"},
    { label: "solarizedLight", value: "solarizedLight"},
    { label: "sublime", value: "sublime"},
    { label: "tokyoNight", value: "tokyoNight"},
    { label: "tokyoNightDay", value: "tokyoNightDay"},
    { label: "tokyoNightStorm", value: "tokyoNightStorm"},
    { label: "tomorrowNightBlue", value: "tomorrowNightBlue"},
    { label: "vscodeDark", value: "vscodeDark"},
    { label: "vscodeLight", value: "vscodeLight"},
    { label: "whiteDark", value: "whiteDark"},
    { label: "whiteLight", value: "whiteLight"},
    { label: "xcodeDark", value: "xcodeDark"},
    { label: "xcodeLight", value: "xcodeLight"},
]

type ThemeOption =
    "dark" |
    "light" |
    "githubLight" |
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
    "gruvboxDark" |
    "gruvboxLight"|
    "kimbie" |
    "material"|
    "noctisLilac"|
    "nord"|
    "okaidia"|
    "quietlight"|
    "red"|
    "solarizedLight"|
    "solarizedDark"|
    "sublime"|
    "tokyoNight"|
    "tokyoNightDay"|
    "tokyoNightStorm"|
    "tomorrowNightBlue"|
    "vscodeDark"|
    "vscodeLight"|
    "whiteDark"|
    "whiteLight"|
    "xcodeDark"|
    "xcodeLight"


const themes: Record<string, Extension> = {
    dark: basicDark,
    light: githubLight,
    githubLight: githubLight,
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
    gruvboxDark: gruvboxDark,
    gruvboxLight: gruvboxLight,
    kimbie: kimbie,
    material: material,
    noctisLilac: noctisLilac,
    nord: nord,
    okaidia: okaidia,
    quietlight: quietlight,
    red: red,
    solarizedDark: solarizedDark,
    solarizedLight: solarizedLight,
    sublime: sublime,
    tokyoNight: tokyoNight,
    tokyoNightDay: tokyoNightDay,
    tokyoNightStorm: tokyoNightStorm,
    tomorrowNightBlue: tomorrowNightBlue,
    vscodeDark: vscodeDark,
    vscodeLight: vscodeLight,
    whiteDark: whiteDark,
    whiteLight: whiteLight,
    xcodeDark: xcodeDark,
    xcodeLight: xcodeLight,
}

export const defaultEditorTheme = basicDark

export const findKeyByValue = (value: Extension) => {
    return Object.keys(themes).find(key => themes[key] === value) 
}


export const getTheme = (themeName: string) => {
    return themes[themeName as ThemeOption]
}