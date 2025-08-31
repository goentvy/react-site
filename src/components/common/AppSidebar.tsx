import { DEVELOPER_CATEGORY_LIST, HTML_CSS_CATEGORY_LIST, JS_CATEGORY_LIST, REACT_CATEGORY_LIST, TAILWINDCSS_CATEGORY_LIST, ERROR_CATEGORY_LIST, ZOD_CATEGORY_LIST, SUPABASE_CATEGORY_LIST, VUE_CATEGORY_LIST, PROJECT_CATEGORY_LIST, GITHUB_CATEGORY_LIST } from "../../constants/category.constant";
import { NavLink } from "react-router";
import { ChevronDown, CodeXml, List } from "lucide-react";
import {
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui"

interface ContentItem {
  id: number;
  label: string;
  category: string;
}

interface CollapsibleMenuProps {
  title: string;
  path: string;
  contentList: ContentItem[];
  close: () => void;
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({title, path, contentList, close}) => {
    return (
        <Collapsible>
            <div className="w-full flex flex-col gap-2">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex flex-row justify-start items-center gap-2 text-muted-foreground hover:text-white hover:pl-6 transition-all duration-500">
                        <List />
                        {title}
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="w-full flex flex-col gap-2">
                {contentList.map((menu) => {
                        return (
                            <NavLink to={`/${path}/${menu.category}`} key={menu.id} onClick={close}
                                className="flex flex-row justify-start items-center gap-2 text-muted-foreground hover:text-white hover:pl-2 transition-all duration-500">
                                <Button variant="ghost">
                                    <CodeXml />
                                    {menu.label}
                                </Button>
                            </NavLink>
                        )
                    }
                )}
            </CollapsibleContent>
        </Collapsible>
    )
}
interface AsideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}


const AppSidebar: React.FC<AsideMenuProps> = ({ isOpen, onClose }) => {
    return (
        <aside
            className={`aside-menu lg:z-9 min-w-60 w-60 lg:flex flex-col gap-4 fixed lg:static top-0 left-0 h-full bg-[#20232a] lg:bg-[#0A0A0A] z-50 
                transform transition-transform duration-300 ease-in-out 
                ${isOpen ? "open translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
            <div className="flex items-center gap-2 p-3 lg:p-0">
                <p className="scroll-m-20 text-sm lg:text-lg font-semibold tracking-tight">카테고리</p>
                <ChevronDown className="mt-1 w-4 h-4 lg:w-6 lg:h-6" />
            </div>
            <CollapsibleMenu title="HTML+CSS" path="htmlcss" contentList={HTML_CSS_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="JavaScript" path="js" contentList={JS_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="React" path="react" contentList={REACT_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Tailwindcss" path="tailwindcss" contentList={TAILWINDCSS_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Developer" path="developer" contentList={DEVELOPER_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Error" path="error" contentList={ERROR_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Zod" path="zod" contentList={ZOD_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Supabase" path="supabase" contentList={SUPABASE_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Vue" path="vue" contentList={VUE_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Project" path="project" contentList={PROJECT_CATEGORY_LIST} close={onClose} />
            <CollapsibleMenu title="Github" path="github" contentList={GITHUB_CATEGORY_LIST} close={onClose} />
        </aside>
    );
}

export { AppSidebar };
