import { useLocation } from "react-router";
import ZodSchema from "@/study/zod/schema";
import ZodExample from "@/study/zod/example";

function ZodPage() {
    const location = useLocation();
    let path = location.pathname;

    return (
        <div>
            {path === '/zod/zod-schema' ? <ZodSchema /> : <div></div>}
            {path === '/zod/zod-example' ? <ZodExample /> : <div></div>}
        </div>
    );
}

export default ZodPage;