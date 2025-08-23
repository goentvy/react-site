import MDEditor from '@uiw/react-md-editor'
import reactContent from '@/content/react/redux.md?raw'

function Redux() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={reactContent} className="p-6"/>
        </div>
    )
}

export default Redux;