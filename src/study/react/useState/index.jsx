import MDEditor from '@uiw/react-md-editor'
import stateContent from '@/content/react/useState.md?raw'

function UseState() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={stateContent} className="p-6"/>
        </div>
    )
}

export default UseState;