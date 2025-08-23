import { useLocation } from "react-router";
import JsFunction1 from "@/study/js/function_part1";
import JsFunction2 from "@/study/js/function_part2";
import JsFunction3 from "@/study/js/function_part3";
import Callbacks from "@/study/js/callbacks";
import Promise_basics from "@/study/js/promise_basics";
import Promise_method from "@/study/js/promise_method";
import Promise_chaining from "@/study/js/promise_chaining";


function Js() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/js/function1' ? <JsFunction1 /> : <div></div>}
            {path === '/js/function2' ? <JsFunction2 /> : <div></div>}
            {path === '/js/function3' ? <JsFunction3 /> : <div></div>}
            {path === '/js/callbacks' ? <Callbacks /> : <div></div>}
            {path === '/js/promise-basics' ? <Promise_basics /> : <div></div>}
            {path === '/js/promise-method' ? <Promise_method /> : <div></div>}
            {path === '/js/promise-chaining' ? <Promise_chaining /> : <div></div>}
        </div>
    );
}

export default Js;