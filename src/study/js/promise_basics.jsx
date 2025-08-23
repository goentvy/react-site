import MDEditor from '@uiw/react-md-editor'
import jsContent from '@/content/js/promise_basics.md?raw'

function Promise_basics() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={jsContent} className="p-6"/>
        </div>
    )
}

export default Promise_basics;