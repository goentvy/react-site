import MDEditor from '@uiw/react-md-editor'
import jsContent from '@/content/js/callbacks.md?raw'

function Callbacks() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={jsContent} className="p-6"/>
        </div>
    )
}

export default Callbacks;