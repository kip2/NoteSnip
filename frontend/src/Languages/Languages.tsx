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
import { diff } from "@codemirror/legacy-modes/mode/diff"
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile"
import { dtd } from "@codemirror/legacy-modes/mode/dtd"
import { dylan } from "@codemirror/legacy-modes/mode/dylan"
import { ebnf } from "@codemirror/legacy-modes/mode/ebnf"
import { ecl } from "@codemirror/legacy-modes/mode/ecl"
import { eiffel } from "@codemirror/legacy-modes/mode/eiffel"
import { erlang } from "@codemirror/legacy-modes/mode/erlang"
import { factor } from "@codemirror/legacy-modes/mode/factor"
import { fcl } from "@codemirror/legacy-modes/mode/fcl"
import { forth } from "@codemirror/legacy-modes/mode/forth"
import { fortran } from "@codemirror/legacy-modes/mode/fortran"
import { gas } from "@codemirror/legacy-modes/mode/gas"
import { gherkin } from "@codemirror/legacy-modes/mode/gherkin"
import { groovy } from "@codemirror/legacy-modes/mode/groovy"
import { haskell } from "@codemirror/legacy-modes/mode/haskell"
import { haxe } from "@codemirror/legacy-modes/mode/haxe"
import { http } from "@codemirror/legacy-modes/mode/http"
import { idl } from "@codemirror/legacy-modes/mode/idl"
import { jinja2} from "@codemirror/legacy-modes/mode/jinja2"
import { julia } from "@codemirror/legacy-modes/mode/julia"
import { liveScript } from "@codemirror/legacy-modes/mode/livescript"
import { lua } from "@codemirror/legacy-modes/mode/lua"
import { mathematica } from "@codemirror/legacy-modes/mode/mathematica"
import { mbox } from "@codemirror/legacy-modes/mode/mbox"
import { mirc } from "@codemirror/legacy-modes/mode/mirc"
import { modelica } from "@codemirror/legacy-modes/mode/modelica"
import { mscgen } from "@codemirror/legacy-modes/mode/mscgen"
import { mumps } from "@codemirror/legacy-modes/mode/mumps"
import { nginx } from "@codemirror/legacy-modes/mode/nginx"
import { nsis } from "@codemirror/legacy-modes/mode/nsis"
import { ntriples } from "@codemirror/legacy-modes/mode/ntriples"
import { octave } from "@codemirror/legacy-modes/mode/octave"
import { oz } from "@codemirror/legacy-modes/mode/oz"
import { pascal } from "@codemirror/legacy-modes/mode/pascal"
import { pig } from "@codemirror/legacy-modes/mode/pig"
import { powerShell } from "@codemirror/legacy-modes/mode/powershell"
import { properties } from "@codemirror/legacy-modes/mode/properties"
import { protobuf } from "@codemirror/legacy-modes/mode/protobuf"
import { puppet } from "@codemirror/legacy-modes/mode/puppet"
import { q } from "@codemirror/legacy-modes/mode/q"
import { r } from "@codemirror/legacy-modes/mode/r"
import { ruby } from "@codemirror/legacy-modes/mode/ruby"
import { sas } from "@codemirror/legacy-modes/mode/sas"
import { scheme } from "@codemirror/legacy-modes/mode/scheme"
import { shell } from "@codemirror/legacy-modes/mode/shell"
import { sieve } from "@codemirror/legacy-modes/mode/sieve"
import { smalltalk } from "@codemirror/legacy-modes/mode/smalltalk"
import { solr } from "@codemirror/legacy-modes/mode/solr"
import { sparql } from "@codemirror/legacy-modes/mode/sparql"
import { spreadsheet } from "@codemirror/legacy-modes/mode/spreadsheet"
import { stex } from "@codemirror/legacy-modes/mode/stex"
import { stylus } from "@codemirror/legacy-modes/mode/stylus"
import { swift } from "@codemirror/legacy-modes/mode/swift"
import { tcl } from "@codemirror/legacy-modes/mode/tcl"
import { textile } from "@codemirror/legacy-modes/mode/textile"
import { tiddlyWiki } from "@codemirror/legacy-modes/mode/tiddlywiki"
import { tiki } from "@codemirror/legacy-modes/mode/tiki"
import { toml } from "@codemirror/legacy-modes/mode/toml"
import { ttcn } from "@codemirror/legacy-modes/mode/ttcn"
import { turtle } from "@codemirror/legacy-modes/mode/turtle"
import { vb } from "@codemirror/legacy-modes/mode/vb"
import { vbScript } from "@codemirror/legacy-modes/mode/vbscript"
import { velocity } from "@codemirror/legacy-modes/mode/velocity"
import { verilog } from "@codemirror/legacy-modes/mode/verilog"
import { vhdl } from "@codemirror/legacy-modes/mode/vhdl"
import { wast } from "@codemirror/legacy-modes/mode/wast"
import { webIDL } from "@codemirror/legacy-modes/mode/webidl"
import { xQuery } from "@codemirror/legacy-modes/mode/xquery"
import { yacas } from "@codemirror/legacy-modes/mode/yacas"
import { yaml } from "@codemirror/legacy-modes/mode/yaml"
import { z80 } from "@codemirror/legacy-modes/mode/z80"
import { d } from "@codemirror/legacy-modes/mode/d"
import { elm } from "@codemirror/legacy-modes/mode/elm"

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
    "cypher"|
    "diff" |
    "dockerFile" |
    "dtd" |
    "dylan" |
    "ebnf" |
    "eiffel" |
    "elm" |
    "erlang" |
    "factor" |
    "fcl" |
    "forth" |
    "fortran" |
    "gas" |
    "gherkin"  |
    "groovy" |
    "haskell" |
    "haxe" |
    "http" |
    "idl" |
    "jinja2" |
    "julia" |
    "livescript" |
    "lua" |
    "mathematica" |
    "mbox" |
    "mirc" |
    "modelica" |
    "mscgen" |
    "mumps" |
    "nginx" |
    "nsis" |
    "ntriples" |
    "octave" |
    "oz" |
    "pascal" |
    "pig" |
    "powershell" |
    "properties" |
    "protobuf" |
    "puppet" |
    "q" |
    "r" |
    "ruby" |
    "sas" |
    "scheme" |
    "shell" |
    "sieve" |
    "smalltalk" |
    "solr" |
    "sparql" |
    "spreadsheet" |
    "stex" |
    "stylus" |
    "swift" |
    "tcl" |
    "textile" |
    "tiddlyWiki" |
    "tiki" |
    "toml" |
    "ttcn" |
    "turtle" |
    "vb" |
    "vbscript" |
    "velocity" |
    "verilog" |
    "vhdl" |
    "wast" |
    "webIDL" |
    "xQuery" |
    "yacas" |
    "yaml" |
    "z80" 

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
    { label: "diff", value: "diff"},
    { label: "dockerFile", value: "dockerFile"},
    { label: "dtd", value: "dtd"},
    { label: "dylan", value: "dylan"},
    { label: "ebnf", value: "ebnf"},
    { label: "ecl", value: "ecl"},
    { label: "eiffel", value: "eiffel"},
    { label: "elm", value: "elm"},
    { label: "erlang", value: "erlang"},
    { label: "factor", value: "factor"},
    { label: "fcl", value: "fcl"},
    { label: "forth", value: "forth"},
    { label: "fortran", value: "fortran"},
    { label: "gas", value: "gas"},
    { label: "gherkin", value: "gherkin"},
    { label: "groovy", value: "groovy"},
    { label: "haskell", value: "haskell"},
    { label: "haxe", value: "haxe"},
    { label: "http", value: "http"},
    { label: "idl", value: "idl"},
    { label: "jinja2", value: "jinja2"},
    { label: "julia", value: "julia"},
    { label: "livescript", value: "livescript"},
    { label: "lua", value: "lua"},
    { label: "mathematica", value: "mathematica"},
    { label: "mbox", value: "mbox"},
    { label: "mIRC", value: "mirc"},
    { label: "modelica", value: "modelica"},
    { label: "mscgen", value: "mscgen"},
    { label: "mumps", value: "mumps"},
    { label: "nginx", value: "nginx"},
    { label: "nsis", value: "nsis"},
    { label: "ntriples", value: "ntriples"},
    { label: "octave", value: "octave"},
    { label: "oz", value: "oz"},
    { label: "pascal", value: "pascal"},
    { label: "pig", value: "pig"},
    { label: "powershell", value: "powershell"},
    { label: "properties", value: "properties"},
    { label: "protobuf", value: "protobuf"},
    { label: "puppet", value: "puppet"},
    { label: "q", value: "q"},
    { label: "r", value: "r"},
    { label: "ruby", value: "ruby"},
    { label: "sas", value: "sas"},
    { label: "scheme", value: "scheme"},
    { label: "shell", value: "shell"},
    { label: "sieve", value: "sieve"},
    { label: "smalltalk", value: "smalltalk"},
    { label: "solr", value: "solr"},
    { label: "sparql", value: "sparql"},
    { label: "spreadsheet", value: "spreadsheet"},
    { label: "stex", value: "stex"},
    { label: "stylus", value: "stylus"},
    { label: "swift", value: "swift"},
    { label: "tcl", value: "tcl"},
    { label: "textile", value: "textile"},
    { label: "tiddlyWiki", value: "tiddlyWiki"},
    { label: "tiki", value: "tiki"},
    { label: "toml", value: "toml"},
    { label: "ttcn", value: "ttcn"},
    { label: "turtle", value: "turtle"},
    { label: "VB.net", value: "vb"},
    { label: "VBScript", value: "vbscript"},
    { label: "velocity", value: "velocity"},
    { label: "verilog", value: "verilog"},
    { label: "vhdl", value: "vhdl"},
    { label: "wast", value: "wast"},
    { label: "webIDL", value: "webIDL"},
    { label: "xQuery", value: "xQuery"},
    { label: "yacas", value: "yacas"},
    { label: "yaml", value: "yaml"},
    { label: "z80", value: "z80"},
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
    diff: StreamLanguage.define(diff),
    dockerFile: StreamLanguage.define(dockerFile),
    dtd: StreamLanguage.define(dtd),
    dylan: StreamLanguage.define(dylan),
    ebnf: StreamLanguage.define(ebnf),
    ecl: StreamLanguage.define(ecl),
    eiffel: StreamLanguage.define(eiffel),
    elm: StreamLanguage.define(elm),
    erlang: StreamLanguage.define(erlang),
    factor: StreamLanguage.define(factor),
    fcl: StreamLanguage.define(fcl),
    forth: StreamLanguage.define(forth),
    fortran: StreamLanguage.define(fortran),
    gas: StreamLanguage.define(gas),
    gherkin: StreamLanguage.define(gherkin),
    groovy: StreamLanguage.define(groovy),
    haskell: StreamLanguage.define(haskell),
    haxe: StreamLanguage.define(haxe),
    http: StreamLanguage.define(http),
    idl: StreamLanguage.define(idl),
    jinja2: StreamLanguage.define(jinja2),
    julia: StreamLanguage.define(julia),
    livescript: StreamLanguage.define(liveScript),
    lua: StreamLanguage.define(lua),
    mathematica: StreamLanguage.define(mathematica),
    mbox: StreamLanguage.define(mbox),
    mirc: StreamLanguage.define(mirc),
    modelica: StreamLanguage.define(modelica),
    mscgen: StreamLanguage.define(mscgen),
    mumps: StreamLanguage.define(mumps),
    nginx: StreamLanguage.define(nginx),
    nsis: StreamLanguage.define(nsis),
    ntriples: StreamLanguage.define(ntriples),
    octave: StreamLanguage.define(octave),
    oz: StreamLanguage.define(oz),
    pascal: StreamLanguage.define(pascal),
    pig: StreamLanguage.define(pig),
    powershell: StreamLanguage.define(powerShell),
    properties: StreamLanguage.define(properties),
    protobuf: StreamLanguage.define(protobuf),
    puppet: StreamLanguage.define(puppet),
    q: StreamLanguage.define(q),
    r: StreamLanguage.define(r),
    ruby: StreamLanguage.define(ruby),
    sas: StreamLanguage.define(sas),
    scheme: StreamLanguage.define(scheme),
    shell: StreamLanguage.define(shell),
    sieve: StreamLanguage.define(sieve),
    smalltalk: StreamLanguage.define(smalltalk),
    solr: StreamLanguage.define(solr),
    sparql: StreamLanguage.define(sparql),
    spreadsheet: StreamLanguage.define(spreadsheet),
    stex: StreamLanguage.define(stex),
    stylus: StreamLanguage.define(stylus),
    swift: StreamLanguage.define(swift),
    tcl: StreamLanguage.define(tcl),
    textile: StreamLanguage.define(textile),
    tiddlyWiki: StreamLanguage.define(tiddlyWiki),
    tiki: StreamLanguage.define(tiki),
    toml: StreamLanguage.define(toml),
    ttcn: StreamLanguage.define(ttcn),
    turtle: StreamLanguage.define(turtle),
    vb: StreamLanguage.define(vb),
    vbscript: StreamLanguage.define(vbScript),
    velocity: StreamLanguage.define(velocity),
    verilog: StreamLanguage.define(verilog),
    vhdl: StreamLanguage.define(vhdl),
    wast: StreamLanguage.define(wast),
    webIDL: StreamLanguage.define(webIDL),
    xQuery: StreamLanguage.define(xQuery),
    yacas: StreamLanguage.define(yacas),
    yaml: StreamLanguage.define(yaml),
    z80: StreamLanguage.define(z80),
}


const getLanguageExtension = (lang: string) => {
    return languages[lang as LanguageOption] || [] 
}

export default getLanguageExtension