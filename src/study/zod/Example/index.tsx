import MDEditor from '@uiw/react-md-editor'
import ZodContent from '@/content/zod/example.md?raw'

function ZodExample() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={ZodContent} className="p-6"/>
        </div>
    )
}

export default ZodExample;