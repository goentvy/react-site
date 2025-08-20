import MDEditor from '@uiw/react-md-editor'
import callbackContent from '@/content/react/useCallback.md?raw'

function UseCallback() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={callbackContent} className="p-6"/>
        </div>
    )
}

export default UseCallback;