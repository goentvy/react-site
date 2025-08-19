import { STUDY_CATEGORY } from "@/constants/category.constant";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui";
import { NavLink, useNavigate } from "react-router";

function AppSidebar() {
    const navigate = useNavigate();
    
    return (
        <aside className="min-w-60 w-60 flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">카테고리</h4>
                <ChevronDown className="mt-1" />
            </div>
            <div className="w-full flex flex-col gap-2">
                {STUDY_CATEGORY.map((menu) => {
                    return (
                        <NavLink to={`/${menu.category}`} key={menu.id} 
                            className="flex flex-row justify-start items-center gap-2 text-muted-foreground hover:text-white hover:pl-6 transition-all duration-500">
                            <Button variant="ghost">
                                {menu.icon}
                                {menu.label}
                            </Button>
                        </NavLink>
                    );
                })}
            </div>
        </aside>
    );
}

export { AppSidebar };
