import MDEditor from '@uiw/react-md-editor'
import roadmapContent from '@/content/developer/backend_roadmap.md?raw'

function Backend() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={roadmapContent} className="p-6"/>
        </div>
    )
}

export default Backend;