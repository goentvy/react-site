import MDEditor from '@uiw/react-md-editor'
import functionContent from '@/content/js/function_part2.md?raw'

function JsFunction2() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={functionContent} className="p-6"/>
        </div>
    )
}

export default JsFunction2;