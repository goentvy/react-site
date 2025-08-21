import MDEditor from '@uiw/react-md-editor'
import lazyLoadingContent from '@/content/developer/lazyLoading.md?raw'

function Lazyloading() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={lazyLoadingContent} className="p-6"/>
        </div>
    )
}

export default Lazyloading;