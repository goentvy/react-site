import { useLocation } from "react-router";
import NewsApp from "@/study/project/news";

function ProjectPage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/project/news' ? <NewsApp /> : <div></div>}
        </div>
    );
}

export default ProjectPage;