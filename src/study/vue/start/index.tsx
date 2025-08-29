import MDEditor from '@uiw/react-md-editor'
import vueContent from '@/content/vue/start.md?raw'

function VueStart() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={vueContent} className="p-6"/>
        </div>
    )
}

export default VueStart;