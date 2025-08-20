import MDEditor from '@uiw/react-md-editor'
import memoContent from '../../content/useMemo.md?raw'

function UseMemo() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={memoContent} className="p-6"/>
        </div>
    )
}

export default UseMemo;