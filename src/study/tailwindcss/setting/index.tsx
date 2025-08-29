import MDEditor from '@uiw/react-md-editor'
import tailwindcssContent from '@/content/tailwindcss/setting.md?raw'

function Setting() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={tailwindcssContent} className="p-6"/>
        </div>
    )
}

export default Setting;