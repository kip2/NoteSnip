import { javascript } from "@codemirror/lang-javascript";
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { html } from "@codemirror/lang-html";

type LanguageOption = 
    'javascript' |
    'rust' |
    'jsx' |
    'cpp' |
    'html'

import { NativeSelectItem } from "@yamada-ui/react";

export const items: NativeSelectItem[] = [
    { label: "javascript", value: "javascript"},
    { label: "jsx", value: "jsx"},
    { label: "rust", value: "rust"},
    { label: "c++", value: "cpp"},
    { label: "html", value: "html"},
]

const languages = {
    jsx: javascript({ jsx: true }),
    javascript: javascript(),
    rust: rust(),
    cpp: cpp(),
    html: html(),
}


const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension