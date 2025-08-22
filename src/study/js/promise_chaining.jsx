import MDEditor from '@uiw/react-md-editor'
import promiseContent from '@/content/js/promise_chaining.md?raw'

function Promise_chaining() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={promiseContent} className="p-6"/>
        </div>
    )
}

export default Promise_chaining;