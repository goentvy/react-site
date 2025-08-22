import MDEditor from '@uiw/react-md-editor'
import callbacksContent from '@/content/js/callbacks.md?raw'

function Callbacks() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={callbacksContent} className="p-6"/>
        </div>
    )
}

export default Callbacks;