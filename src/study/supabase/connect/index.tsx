import MDEditor from '@uiw/react-md-editor'
import supabaseContent from '@/content/supabase/connect.md?raw'

function Connect() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={supabaseContent} className="p-6"/>
        </div>
    )
}

export default Connect;