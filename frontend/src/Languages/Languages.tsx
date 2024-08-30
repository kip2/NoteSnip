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
import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go"
import { apl } from "@codemirror/legacy-modes/mode/apl"
import { asciiArmor} from "@codemirror/legacy-modes/mode/asciiarmor"
import { asterisk } from "@codemirror/legacy-modes/mode/asterisk"
import { brainfuck } from "@codemirror/legacy-modes/mode/brainfuck"
import { cmake } from "@codemirror/legacy-modes/mode/cmake"
import { cobol } from "@codemirror/legacy-modes/mode/cobol"
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript"
import { commonLisp } from "@codemirror/legacy-modes/mode/commonlisp"
import { crystal} from "@codemirror/legacy-modes/mode/crystal"
import { css } from "@codemirror/legacy-modes/mode/css"
import { cypher } from "@codemirror/legacy-modes/mode/cypher"
// おかしいので見直す
import { d } from "@codemirror/legacy-modes/mode/d"

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
    "lezer" |
    "go" |
    "apl" |
    "asciiArmor" |
    "asterisk" |
    "brainfuck" |
    "cmake" |
    "cobol" |
    "coffeeScript" |
    "commonLisp" |
    "crystal" |
    "d" |
    "css" |
    "cypher"

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
    { label: "go", value: "go"},
    { label: "apl", value: "apl"},
    { label: "asciiArmor", value: "asciiArmor"},
    { label: "asterisk", value: "asterisk"},
    { label: "brainfuck", value: "brainfuck"},
    { label: "cmake", value: "cmake"},
    { label: "cobol", value: "cobol"},
    { label: "coffeeScript", value: "coffeeScript"},
    { label: "commonLisp", value: "commonLisp"},
    { label: "crystal", value: "crystal"},
    { label: "d", value: "d"},
    { label: "css", value: "css"},
    { label: "cypher", value: "cypher"},
    // { label: "go", value: "go"},
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
    go: StreamLanguage.define(go),
    apl: StreamLanguage.define(apl),
    asciiArmor: StreamLanguage.define(asciiArmor),
    asterisk: StreamLanguage.define(asterisk),
    brainfuck: StreamLanguage.define(brainfuck),
    cmake: StreamLanguage.define(cmake),
    cobol: StreamLanguage.define(cobol),
    coffeeScript: StreamLanguage.define(coffeeScript),
    crystal: StreamLanguage.define(crystal),
    commonLisp: StreamLanguage.define(commonLisp),
    d: StreamLanguage.define(d),
    css: StreamLanguage.define(css),
    cypher: StreamLanguage.define(cypher),
    // go: StreamLanguage.define(go),
}


const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension