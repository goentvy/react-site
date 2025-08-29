import MDEditor from '@uiw/react-md-editor'
import projectContent from '@/content/project/movie.md?raw'

function Movie() {
    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={projectContent} className="p-6"/>
        </div>
    )
}

export default Movie;