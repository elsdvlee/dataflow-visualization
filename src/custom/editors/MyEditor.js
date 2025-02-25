import Editor from "@monaco-editor/react";
import {useState} from "react";

const MyEditor = ({language, data, setData, modelName, schema}) => {

    const [myEditor, setMyEditor] = useState(null);
    const [myMonaco, setMyMonaco] = useState(null);
    const [myModel, setMyModel] = useState(null)
    const [myModelUri, setMyModelUri] = useState(null)

    function editorDidMountNodes(editor, monaco) {
        // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults

        const modelUri = monaco.Uri.parse(modelName + ".json"); // a made up unique URI for our model
        const model = monaco.editor.createModel(data, 'json', modelUri);

        setMyEditor(editor);
        setMyMonaco(monaco);
        setMyModel(model);
        setMyModelUri(modelUri)

        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    // uri: "http://nodes-schema.json",
                    fileMatch: [modelUri.toString()],
                    schema: schema
                }
            ]
        })

        editor.setModel(model);
    }


    // This is a dirty fix
    // This component gets created multiple times and the changes you do on monaco or editor are probably overwritten
    // In this function, I just overwrite it again when you click with you mouse on the editor
    function initAgain() {
        myMonaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    // uri: "http://.....-schema.json",
                    fileMatch: [myModelUri.toString()],
                    schema: schema
                }
            ]
        })

        myEditor.setModel(myModel);
    }


    return <>
        <div onClick={initAgain} style={{height: "100%"}}>
            <Editor
                onMount={editorDidMountNodes}
                language={language}
                value={data}
                onChange={content => setData(content)}
                theme="vs-dark"
                style={{
                    width: "100%"
                }}
            />
        </div>
    </>
}

export default MyEditor;
