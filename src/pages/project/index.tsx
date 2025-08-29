import { useLocation } from "react-router";
import News from "@/study/project/news";
import NewsApp from "@/study/project/newsApp";
import Movie from "@/study/project/movie";
import MovieApp from "@/study/project/movieApp";

function ProjectPage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/project/news' ? <News /> : <div></div>}
            {path === '/project/newsApp' ? <NewsApp /> : <div></div>}
            {path === '/project/movie' ? <Movie /> : <div></div>}
            {path === '/project/movieApp' ? <MovieApp /> : <div></div>}
        </div>
    );
}

export default ProjectPage;