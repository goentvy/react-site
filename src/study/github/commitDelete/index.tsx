import MDEditor from '@uiw/react-md-editor'
import githubContent from '@/content/github/commit_delete.md?raw'

function CommitDelete() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={githubContent} className="p-6"/>
        </div>
    )
}

export default CommitDelete;