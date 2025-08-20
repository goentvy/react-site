import MDEditor from '@uiw/react-md-editor'
import effectContent from '../../content/useEffect.md?raw'

function UseEffect() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={effectContent} className="p-6"/>
        </div>
    )
}

export default UseEffect;