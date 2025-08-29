import MDEditor from '@uiw/react-md-editor'
import developerContent from '@/content/developer/backend_roadmap.md?raw'

function Backend() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={developerContent} className="p-6"/>
        </div>
    )
}

export default Backend;