import { useLocation } from "react-router";
import UseState from "../../study/useState";
import UseEffect from "../../study/useEffect";
import UseCallback from "../../study/useCallback";
import UseMemo from "../../study/useMemo";
import UseRef from "../../study/useRef";
import UseContext from "../../study/useContext";
import Redux from "../../study/redux";
import Zustand from "../../study/zustand";
import Mini_Blog from "../../study/mini/Mini_Blog.jsx";
import Web_Design from "../../study/webdesign";


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
            {path === '/react/webdesign' ? <Web_Design /> : <div></div>}
        </div>
    );
}

export default ReactJs;