import MDEditor from '@uiw/react-md-editor'
import reduxContent from '@/content/react/redux.md?raw'

function Redux() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={reduxContent} className="p-6"/>
        </div>
    )
}

export default Redux;