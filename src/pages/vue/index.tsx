import { useLocation } from "react-router";
import VueStart from "@/study/vue/start";

function VuePage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/vue/vue-start' ? <VueStart /> : <div></div>}
        </div>
    );
}

export default VuePage;