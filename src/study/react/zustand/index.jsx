import MDEditor from '@uiw/react-md-editor'
import zustandContent from '@/content/react/zustand.md?raw'

function Zustand() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={zustandContent} className="p-6"/>
        </div>
    )
}

export default Zustand;