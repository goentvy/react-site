import MDEditor from '@uiw/react-md-editor'
import jsContent from '@/content/js/function_part3.md?raw'

function JsFunction3() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={jsContent} className="p-6"/>
        </div>
    )
}

export default JsFunction3;