import { useLocation } from "react-router";
import Connect from "@/study/supabase/connect";

function SupabasePage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/supabase/supabase-connect' ? <Connect /> : <div></div>}
        </div>
    );
}

export default SupabasePage;