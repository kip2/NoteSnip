import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { javascript } from '@codemirror/lang-javascript';

const Editor = () => {
    const [code, setCode] = useState('console.log("Hello, world")')
    const onCodeChange = useCallback((val, viewUpdate) => {
        console.log('val', val)
        setCode(val)
    }, [])

    return (
        <CodeMirror
            value={code}
            height="200px"
            extensions={[javascript({ jsx: true })]}
            onChange={onCodeChange}
        />

    )
}

export default Editor;