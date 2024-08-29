import { javascript } from "@codemirror/lang-javascript";
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { less } from "@codemirror/lang-less"
import { sass } from "@codemirror/lang-sass"
import { clojure } from "@nextjournal/lang-clojure"
import { csharp } from "@replit/codemirror-lang-csharp"
import { lezer } from "@codemirror/lang-lezer"

type LanguageOption = 
    "javascript" |
    "rust" |
    "jsx" |
    "cpp" |
    "html" |
    "java" |
    "json" |
    "markdown" | 
    "php" |
    "python" |
    "sql" |
    "xml" |
    "less" |
    "sass" |
    "clojure" |
    "csharp" |
    "lezer"

import { NativeSelectItem } from "@yamada-ui/react";

export const items: NativeSelectItem[] = [
    { label: "javascript", value: "javascript"},
    { label: "jsx", value: "jsx"},
    { label: "rust", value: "rust"},
    { label: "c++", value: "cpp"},
    { label: "html", value: "html"},
    { label: "java", value: "java"},
    { label: "json", value: "json"},
    { label: "markdown", value: "markdown"},
    { label: "php", value: "php"},
    { label: "python", value: "python"},
    { label: "sql", value: "sql"},
    { label: "xml", value: "xml"},
    { label: "less", value: "less"},
    { label: "sass", value: "sass"},
    { label: "clojure", value: "clojure"},
    { label: "C#", value: "csharp"},
    { label: "lezer", value: "lezer"},
]

const languages = {
    jsx: javascript({ jsx: true }),
    javascript: javascript(),
    rust: rust(),
    cpp: cpp(),
    html: html(),
    java: java(),
    json: json(),
    markdown: markdown(),
    php: php(),
    python: python(),
    sql: sql(),
    xml: xml(),
    less: less(),
    sass: sass(),
    clojure: clojure(),
    csharp: csharp(),
    lezer: lezer(),
}


const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension