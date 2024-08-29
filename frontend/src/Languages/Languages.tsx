import { javascript } from "@codemirror/lang-javascript";
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";

type LanguageOption = 
    'javascript' |
    'rust' |
    'jsx' |
    'cpp' |
    'html' |
    'java' |
    'json'

import { NativeSelectItem } from "@yamada-ui/react";

export const items: NativeSelectItem[] = [
    { label: "javascript", value: "javascript"},
    { label: "jsx", value: "jsx"},
    { label: "rust", value: "rust"},
    { label: "c++", value: "cpp"},
    { label: "html", value: "html"},
    { label: "java", value: "java"},
    { label: "json", value: "json"},
]

const languages = {
    jsx: javascript({ jsx: true }),
    javascript: javascript(),
    rust: rust(),
    cpp: cpp(),
    html: html(),
    java: java(),
    json: json(),
}


const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension