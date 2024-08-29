import { javascript } from "@codemirror/lang-javascript";
import { rust } from '@codemirror/lang-rust';

type LanguageOption = 'javascript' | 'rust' | 'jsx'

import { NativeSelectItem } from "@yamada-ui/react";

export const items: NativeSelectItem[] = [
    { label: "javascript", value: "javascript"},
    { label: "jsx", value: "jsx"},
    { label: "rust", value: "rust"},
]

const languages = {
    jsx: javascript({ jsx: true }),
    javascript: javascript(),
    rust: rust(),
}


const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension