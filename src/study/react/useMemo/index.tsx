import MDEditor from '@uiw/react-md-editor'
import reactContent from '@/content/react/useMemo.md?raw'

function UseMemo() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={reactContent} className="p-6"/>
        </div>
    )
}

export default UseMemo;