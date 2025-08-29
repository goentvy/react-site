import MDEditor from '@uiw/react-md-editor'
import developerContent from '@/content/developer/frontend_roadmap.md?raw'

function Frontend() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={developerContent} className="p-6"/>
        </div>
    )
}

export default Frontend;