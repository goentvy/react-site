import { useLocation } from "react-router";
import Setting from "@/study/tailwindcss/setting";

function Tailwindcss() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/tailwindcss/setting' ? <Setting /> : <div></div>}
        </div>
    );
}

export default Tailwindcss;