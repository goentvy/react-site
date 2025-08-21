import { useLocation } from "react-router";
import UseState from "@/study/react/useState";
import UseEffect from "@/study/react/useEffect";
import UseCallback from "@/study/react/useCallback";
import UseMemo from "@/study/react/useMemo";
import UseRef from "@/study/react/useRef";
import UseContext from "@/study/react/useContext";
import Redux from "@/study/react/redux";
import Zustand from "@/study/react/zustand";
import Mini_Blog from "@/study/mini/Mini_Blog.jsx";
import WebDesign from "@/study/webdesign";


function ReactJs() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/react/useState' ? <UseState /> : <div></div>}
            {path === '/react/useEffect' ? <UseEffect /> : <div></div>}
            {path === '/react/useCallback' ? <UseCallback /> : <div></div>}
            {path === '/react/useMemo' ? <UseMemo /> : <div></div>}
            {path === '/react/useRef' ? <UseRef /> : <div></div>}
            {path === '/react/useContext' ? <UseContext /> : <div></div>}
            {path === '/react/redux' ? <Redux /> : <div></div>}
            {path === '/react/zustand' ? <Zustand /> : <div></div>}
            {path === '/Mini_blog' ? <Mini_Blog /> : <div></div>}
            {path === '/react/webdesign' ? <WebDesign /> : <div></div>}
        </div>
    );
}

export default ReactJs;