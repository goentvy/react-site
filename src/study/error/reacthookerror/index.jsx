import MDEditor from '@uiw/react-md-editor'
import ErrorContent from '@/content/error/react_hook_error.md?raw'

function HookError() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={ErrorContent} className="p-6"/>
        </div>
    )
}

export default HookError;