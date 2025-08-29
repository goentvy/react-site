import MDEditor from '@uiw/react-md-editor'
import ErrorContent from '@/content/error/outdated_optimize_dep.md?raw'

function OutdatedOptimizeDep() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={ErrorContent} className="p-6"/>
        </div>
    )
}

export default OutdatedOptimizeDep;