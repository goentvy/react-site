import MDEditor from '@uiw/react-md-editor'
import promiseContent from '@/content/js/promise_method.md?raw'

function Promise_method() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={promiseContent} className="p-6"/>
        </div>
    )
}

export default Promise_method;