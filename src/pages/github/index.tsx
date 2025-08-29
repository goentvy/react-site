import { useLocation } from "react-router";
import CommitDelete from "@/study/github/commitDelete";

function GithubPage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/github/git-commit' ? <CommitDelete /> : <div></div>}
        </div>
    );
}

export default GithubPage;