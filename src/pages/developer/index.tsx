import { useLocation } from "react-router";
import Frontend from "@/study/developer/frontendroadmap";
import Backend from "@/study/developer/backendroadmap";
import Lazyloading from "@/study/developer/lazyloading";

function DeveloperPage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/developer/frontend' ? <Frontend /> : <div></div>}
            {path === '/developer/backend' ? <Backend /> : <div></div>}
            {path === '/developer/lazyloading' ? <Lazyloading /> : <div></div>}
        </div>
    );
}

export default DeveloperPage;