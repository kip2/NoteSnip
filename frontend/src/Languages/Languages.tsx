import { AutocompleteItem } from "@yamada-ui/react";

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
import { svelte } from "@replit/codemirror-lang-svelte"
import { elixir} from "codemirror-lang-elixir"
import { golfScript } from "codemirror-lang-golfscript"
import { dot} from "cm-lang-dot"
import { handlebarsLanguage } from "@xiechao/codemirror-lang-handlebars"
import { hcl } from "codemirror-lang-hcl"
import { j } from "codemirror-lang-j"
import { janet } from "codemirror-lang-janet"
import { liquidHTMLLanguage } from "codemirror-lang-liquid"
import { nix } from "@replit/codemirror-lang-nix"
import { solidity } from "@replit/codemirror-lang-solidity"
import { wgsl } from "@iizukak/codemirror-lang-wgsl"
import { c, scala, kotlin, shader, nesC, objectiveC, objectiveCpp, squirrel, dart } from "@codemirror/legacy-modes/mode/clike"
import { oCaml, fSharp, sml} from "@codemirror/legacy-modes/mode/mllike"
import { pegjs } from "@codemirror/legacy-modes/mode/pegjs"
import { perl } from "@codemirror/legacy-modes/mode/perl"
import { SQLite, Cassandra, MSSQL, MariaSQL, PLSQL, PostgreSQL,MySQL } from "@codemirror/lang-sql";

type LanguageOption = 
    "apl" |
    "asciiArmor" |
    "asterisk" |
    "brainfuck" |
    "c" |
    "cassandra" |
    "clojure" |
    "cmake" |
    "cobol" |
    "coffeeScript" |
    "commonLisp" |
    "cpp" |
    "crystal" |
    "css" |
    "csharp" |
    "cypher" |
    "d" |
    "dart" |
    "diff" |
    "dockerFile" |
    "dtd" |
    "dylan" |
    "ebnf" |
    "ecl" |
    "eiffel" |
    "elixir" |
    "elm" |
    "erlang" |
    "factor" |
    "fcl" |
    "forth" |
    "fortran" |
    "fsharp" |
    "gas" |
    "gherkin" |
    "go" |
    "golfscript" |
    "graphviz" |
    "groovy" |
    "handlebars" |
    "haskell" |
    "haxe" |
    "hcl" |
    "html" |
    "http" |
    "idl" |
    "j" |
    "janet" |
    "java" |
    "javascript" |
    "jinja2" |
    "json" |
    "jsx" |
    "julia" |
    "kotlin" |
    "lezer" |
    "less" |
    "liveScript" |
    "liquid" |
    "lua" |
    "mariasql" |
    "markdown" |
    "mathematica" |
    "mbox" |
    "mirc" |
    "modelica" |
    "mscgen" |
    "mssql" |
    "mumps" |
    "mysql" |
    "nesC" |
    "nginx" |
    "nix" |
    "nsis" |
    "ntriples" |
    "objectiveC" |
    "objectiveCpp" |
    "ocaml" |
    "octave" |
    "oz" |
    "pascal" |
    "pegjs" |
    "perl" |
    "php" |
    "pig" |
    "plsql" |
    "plaintext" |
    "powerShell" |
    "postgresql" |
    "properties" |
    "protobuf" |
    "puppet" |
    "python" |
    "q" |
    "r" |
    "ruby" |
    "rust" |
    "sas" |
    "sass" |
    "scala" |
    "scheme" |
    "shader" |
    "shell" |
    "sieve" |
    "smalltalk" |
    "sml" |
    "solidity" |
    "solr" |
    "sparql" |
    "sqlite" |
    "spreadsheet" |
    "sql" |
    "squirrel" |
    "stex" |
    "stylus" |
    "svelte" |
    "swift" |
    "tcl" |
    "textile" |
    "tiddlyWiki" |
    "tiki" |
    "toml" |
    "tsx" |
    "ttcn" |
    "turtle" |
    "typescript" |
    "vb" |
    "vbScript" |
    "velocity" |
    "verilog" |
    "vhdl" |
    "wast" |
    "webIDL" |
    "wgsl" |
    "xml" |
    "xQuery" |
    "yacas" |
    "yaml" |
    "z80"


export const items: AutocompleteItem[] = [
    { label: "APL", value: "apl" },
    { label: "AsciiArmor", value: "asciiArmor" },
    { label: "Asterisk", value: "asterisk" },
    { label: "Brainfuck", value: "brainfuck" },
    { label: "C", value: "c" },
    { label: "Cassandra", value: "cassandra" },
    { label: "Clojure", value: "clojure" },
    { label: "CMake", value: "cmake" },
    { label: "COBOL", value: "cobol" },
    { label: "CoffeeScript", value: "coffeeScript" },
    { label: "Common Lisp", value: "commonLisp" },
    { label: "C++", value: "cpp" },
    { label: "Crystal", value: "crystal" },
    { label: "CSS", value: "css" },
    { label: "C#", value: "csharp" },
    { label: "Cypher", value: "cypher" },
    { label: "D", value: "d" },
    { label: "Dart", value: "dart" },
    { label: "Diff", value: "diff" },
    { label: "Dockerfile", value: "dockerFile" },
    { label: "DTD", value: "dtd" },
    { label: "Dylan", value: "dylan" },
    { label: "EBNF", value: "ebnf" },
    { label: "ECL", value: "ecl" },
    { label: "Eiffel", value: "eiffel" },
    { label: "Elixir", value: "elixir" },
    { label: "Elm", value: "elm" },
    { label: "Erlang", value: "erlang" },
    { label: "Factor", value: "factor" },
    { label: "FCL", value: "fcl" },
    { label: "Forth", value: "forth" },
    { label: "Fortran", value: "fortran" },
    { label: "F#", value: "fsharp" },
    { label: "Gas", value: "gas" },
    { label: "Gherkin", value: "gherkin" },
    { label: "Go", value: "go" },
    { label: "GolfScript", value: "golfscript" },
    { label: "GraphViz", value: "graphviz" },
    { label: "Groovy", value: "groovy" },
    { label: "HandleBars", value: "handlebars" },
    { label: "Haskell", value: "haskell" },
    { label: "Haxe", value: "haxe" },
    { label: "HCL", value: "hcl" },
    { label: "HTML", value: "html" },
    { label: "HTTP", value: "http" },
    { label: "IDL", value: "idl" },
    { label: "J", value: "j" },
    { label: "Janet", value: "janet" },
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "Jinja2", value: "jinja2" },
    { label: "JSON", value: "json" },
    { label: "JSX", value: "jsx" },
    { label: "Julia", value: "julia" },
    { label: "Kotlin", value: "kotlin" },
    { label: "Lezer", value: "lezer" },
    { label: "Less", value: "less" },
    { label: "LiveScript", value: "liveScript" },
    { label: "Liquid", value: "liquid" },
    { label: "Lua", value: "lua" },
    { label: "MariaDB", value: "mariasql" },
    { label: "Markdown", value: "markdown" },
    { label: "Mathematica", value: "mathematica" },
    { label: "Mbox", value: "mbox" },
    { label: "mIRC", value: "mirc" },
    { label: "Modelica", value: "modelica" },
    { label: "Mscgen", value: "mscgen" },
    { label: "Mircrosoft SQL Server", value: "mssql" },
    { label: "MUMPS", value: "mumps" },
    { label: "MySQL", value: "mysql" },
    { label: "nesC", value: "nesC" },
    { label: "Nginx", value: "nginx" },
    { label: "Nix", value: "nix" },
    { label: "NSIS", value: "nsis" },
    { label: "N-Triples", value: "ntriples" },
    { label: "objectiveC", value: "objectiveC" },
    { label: "objectiveCpp", value: "objectiveCpp" },
    { label: "OCaml", value: "ocaml" },
    { label: "Octave", value: "octave" },
    { label: "Oz", value: "oz" },
    { label: "Pascal", value: "pascal" },
    { label: "Peg.JS", value: "pegjs" },
    { label: "Perl", value: "perl" },
    { label: "PHP", value: "php" },
    { label: "Pig", value: "pig" },
    { label: "PlainText", value: "plaintext" },
    { label: "PLSQL", value: "plsql" },
    { label: "PowerShell", value: "powerShell" },
    { label: "PostgreSQL", value: "postgresql" },
    { label: "Properties", value: "properties" },
    { label: "Protobuf", value: "protobuf" },
    { label: "Puppet", value: "puppet" },
    { label: "Python", value: "python" },
    { label: "Q", value: "q" },
    { label: "R", value: "r" },
    { label: "Ruby", value: "ruby" },
    { label: "Rust", value: "rust" },
    { label: "SAS", value: "sas" },
    { label: "SASS", value: "sass" },
    { label: "Scala", value: "scala" },
    { label: "Scheme", value: "scheme" },
    { label: "Shader", value: "shader" },
    { label: "Shell", value: "shell" },
    { label: "Sieve", value: "sieve" },
    { label: "Smalltalk", value: "smalltalk" },
    { label: "SML", value: "sml" },
    { label: "Solidity", value: "solidity" },
    { label: "Solr", value: "solr" },
    { label: "SPARQL", value: "sparql" },
    { label: "Spreadsheet", value: "spreadsheet" },
    { label: "SQL", value: "sql" },
    { label: "SQLite", value: "sqlite" },
    { label: "Squirrel", value: "squirrel" },
    { label: "STEX", value: "stex" },
    { label: "Stylus", value: "stylus" },
    { label: "Svelte", value: "svelte" },
    { label: "Swift", value: "swift" },
    { label: "Tcl", value: "tcl" },
    { label: "Textile", value: "textile" },
    { label: "TiddlyWiki", value: "tiddlyWiki" },
    { label: "Tiki", value: "tiki" },
    { label: "TOML", value: "toml" },
    { label: "TSX", value: "tsx" },
    { label: "TTCN", value: "ttcn" },
    { label: "Turtle", value: "turtle" },
    { label: "TypeScript", value: "typescript" },
    { label: "VB", value: "vb" },
    { label: "VBScript", value: "vbscript" },
    { label: "Velocity", value: "velocity" },
    { label: "Verilog", value: "verilog" },
    { label: "VHDL", value: "vhdl" },
    { label: "WAST", value: "wast" },
    { label: "WebIDL", value: "webIDL" },
    { label: "WGSL", value: "wgsl" },
    { label: "XML", value: "xml" },
    { label: "XQuery", value: "xQuery" },
    { label: "Yacas", value: "yacas" },
    { label: "YAML", value: "yaml" },
    { label: "Z80", value: "z80" },
];

const languages =  {
    apl: StreamLanguage.define(apl),
    asciiArmor: StreamLanguage.define(asciiArmor),
    asterisk: StreamLanguage.define(asterisk),
    brainfuck: StreamLanguage.define(brainfuck),
    c: StreamLanguage.define(c),
    cassandra: Cassandra,
    clojure: clojure(),
    cmake: StreamLanguage.define(cmake),
    cobol: StreamLanguage.define(cobol),
    coffeeScript: StreamLanguage.define(coffeeScript),
    commonLisp: StreamLanguage.define(commonLisp),
    cpp: cpp(),
    crystal: StreamLanguage.define(crystal),
    css: StreamLanguage.define(css),
    csharp: csharp(),
    cypher: StreamLanguage.define(cypher),
    d: StreamLanguage.define(d),
    dart: StreamLanguage.define(dart),
    diff: StreamLanguage.define(diff),
    dockerFile: StreamLanguage.define(dockerFile),
    dtd: StreamLanguage.define(dtd),
    dylan: StreamLanguage.define(dylan),
    ebnf: StreamLanguage.define(ebnf),
    ecl: StreamLanguage.define(ecl),
    eiffel: StreamLanguage.define(eiffel),
    elixir: elixir(),
    elm: StreamLanguage.define(elm),
    erlang: StreamLanguage.define(erlang),
    factor: StreamLanguage.define(factor),
    fcl: StreamLanguage.define(fcl),
    forth: StreamLanguage.define(forth),
    fortran: StreamLanguage.define(fortran),
    fsharp: StreamLanguage.define(fSharp),
    gas: StreamLanguage.define(gas),
    gherkin: StreamLanguage.define(gherkin),
    go: StreamLanguage.define(go),
    golfscript: golfScript(),
    graphviz: dot(),
    groovy: StreamLanguage.define(groovy),
    handlebars: handlebarsLanguage,
    haskell: StreamLanguage.define(haskell),
    haxe: StreamLanguage.define(haxe),
    hcl: hcl(),
    html: html(),
    http: StreamLanguage.define(http),
    idl: StreamLanguage.define(idl),
    j: j(),
    janet: janet(),
    java: java(),
    javascript: javascript(),
    jinja2: StreamLanguage.define(jinja2),
    json: json(),
    jsx: javascript({jsx: true}),
    julia: StreamLanguage.define(julia),
    kotlin: StreamLanguage.define(kotlin),
    lezer: lezer(),
    less: less(),
    liveScript: StreamLanguage.define(liveScript),
    liquid: liquidHTMLLanguage,
    lua: StreamLanguage.define(lua),
    mariasql: MariaSQL,
    markdown: markdown(),
    mathematica: StreamLanguage.define(mathematica),
    mbox: StreamLanguage.define(mbox),
    mirc: StreamLanguage.define(mirc),
    modelica: StreamLanguage.define(modelica),
    mscgen: StreamLanguage.define(mscgen),
    mssql: MSSQL,
    mumps: StreamLanguage.define(mumps),
    mysql: MySQL,
    nginx: StreamLanguage.define(nginx),
    nesC: StreamLanguage.define(nesC),
    nix: nix(),
    nsis: StreamLanguage.define(nsis),
    ntriples: StreamLanguage.define(ntriples),
    objectiveC: StreamLanguage.define(objectiveC),
    objectiveCpp: StreamLanguage.define(objectiveCpp),
    ocaml: StreamLanguage.define(oCaml),
    octave: StreamLanguage.define(octave),
    oz: StreamLanguage.define(oz),
    pascal: StreamLanguage.define(pascal),
    pegjs: StreamLanguage.define(pegjs),
    perl: StreamLanguage.define(perl),
    php: php(),
    pig: StreamLanguage.define(pig),
    plsql: PLSQL,
    plaintext: [],
    powerShell: StreamLanguage.define(powerShell),
    postgresql: PostgreSQL,
    properties: StreamLanguage.define(properties),
    protobuf: StreamLanguage.define(protobuf),
    puppet: StreamLanguage.define(puppet),
    python: python(),
    q: StreamLanguage.define(q),
    r: StreamLanguage.define(r),
    ruby: StreamLanguage.define(ruby),
    rust: rust(),
    sas: StreamLanguage.define(sas),
    sass: sass(),
    scala: StreamLanguage.define(scala),
    scheme: StreamLanguage.define(scheme),
    shader: StreamLanguage.define(shader),
    shell: StreamLanguage.define(shell),
    sieve: StreamLanguage.define(sieve),
    smalltalk: StreamLanguage.define(smalltalk),
    sml: StreamLanguage.define(sml),
    solidity: solidity,
    solr: StreamLanguage.define(solr),
    sparql: StreamLanguage.define(sparql),
    spreadsheet: StreamLanguage.define(spreadsheet),
    sql: sql(),
    sqlite: SQLite,
    squirrel: StreamLanguage.define(squirrel),
    stex: StreamLanguage.define(stex),
    stylus: StreamLanguage.define(stylus),
    svelte: svelte(),
    swift: StreamLanguage.define(swift),
    tcl: StreamLanguage.define(tcl),
    textile: StreamLanguage.define(textile),
    tiddlyWiki: StreamLanguage.define(tiddlyWiki),
    tiki: StreamLanguage.define(tiki),
    toml: StreamLanguage.define(toml),
    tsx: javascript({typescript: true, jsx:true}),
    ttcn: StreamLanguage.define(ttcn),
    turtle: StreamLanguage.define(turtle),
    typescript: javascript({typescript: true}),
    vb: StreamLanguage.define(vb),
    vbScript: StreamLanguage.define(vbScript),
    velocity: StreamLanguage.define(velocity),
    verilog: StreamLanguage.define(verilog),
    vhdl: StreamLanguage.define(vhdl),
    wast: StreamLanguage.define(wast),
    webIDL: StreamLanguage.define(webIDL),
    wgsl: wgsl(),
    xml: xml(),
    xQuery: StreamLanguage.define(xQuery),
    yacas: StreamLanguage.define(yacas),
    yaml: StreamLanguage.define(yaml),
    z80: StreamLanguage.define(z80),
};
const getLanguageExtension = (lang: string) => {
    if (!lang || !languages[lang as LanguageOption]) {
        return []
    }
    const extension = languages[lang as LanguageOption]
    return Array.isArray(extension) ? extension : [extension]
}

export default getLanguageExtension