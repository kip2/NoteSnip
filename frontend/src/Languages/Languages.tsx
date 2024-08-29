import { javascript } from "@codemirror/lang-javascript";
import { rust } from '@codemirror/lang-rust';

type LanguageOption = 'javascript' | 'rust' | 'jsx'

const languages = {
    jsx: javascript({ jsx: true }),
    javascript: javascript(),
    rust: rust(),
}

const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension