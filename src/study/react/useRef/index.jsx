import MDEditor from '@uiw/react-md-editor'
import refContent from '@/content/react/useRef.md?raw'

function UseRef() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={refContent} className="p-6"/>
        </div>
    )
}

export default UseRef;