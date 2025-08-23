import { useLocation } from "react-router";
import HookError from "@/study/error/reacthookerror";
import OutdatedOptimizeDep from "@/study/error/outdatedoptimizedep";

function ErrorPage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/error/react-hook-error' ? <HookError /> : <div></div>}
            {path === '/error/outdated-optimize-dep' ? <OutdatedOptimizeDep /> : <div></div>}
        </div>
    );
}

export default ErrorPage;