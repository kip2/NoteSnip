import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { rust } from '@codemirror/lang-rust';
import { githubDark } from "@uiw/codemirror-themes-all";

const Editor = () => {
    const [code, setCode] = useState('console.log("Hello, world")')
    const onCodeChange = useCallback((val, viewUpdate) => {
        console.log('val', val)
        setCode(val)
    }, [])

    return (
        <CodeMirror
            value={code}
            height="700px"
            // extensions={[javascript({ jsx: true })]}
            extensions={[rust()]}
            theme={githubDark}
            onChange={onCodeChange}
        />

    )
}

export default Editor;