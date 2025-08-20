import MDEditor from '@uiw/react-md-editor'
import contextContent from '../../content/useContext.md?raw'

function UseContext() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={contextContent} className="p-6"/>
        </div>
    )
}

export default UseContext;