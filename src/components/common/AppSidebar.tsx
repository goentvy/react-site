import { DEVELOPER_CATEGORY_LIST, HTML_CSS_CATEGORY_LIST, JS_CATEGORY_LIST, REACT_CATEGORY_LIST, TAILWINDCSS_CATEGORY_LIST, ERROR_CATEGORY_LIST, ZOD_CATEGORY_LIST, SUPABASE_CATEGORY_LIST, VUE_CATEGORY_LIST } from "../../constants/category.constant";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui";
import { NavLink } from "react-router";
import { CodeXml, List } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

interface ContentItem {
  id: number;
  label: string;
  category: string;
}

interface CollapsibleMenuProps {
  title: string;
  path: string;
  contentList: ContentItem[];
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({title, path, contentList}) => {
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
                            <NavLink to={`/${path}/${menu.category}`} key={menu.id} 
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

function AppSidebar() {
    return (
        <aside className="min-w-60 w-60 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">카테고리</h4>
                <ChevronDown className="mt-1" />
            </div>
            <CollapsibleMenu title="HTML+CSS" path="htmlcss" contentList={HTML_CSS_CATEGORY_LIST} />
            <CollapsibleMenu title="JavaScript" path="js" contentList={JS_CATEGORY_LIST} />
            <CollapsibleMenu title="React" path="react" contentList={REACT_CATEGORY_LIST} />
            <CollapsibleMenu title="Tailwindcss" path="tailwindcss" contentList={TAILWINDCSS_CATEGORY_LIST} />
            <CollapsibleMenu title="Developer" path="developer" contentList={DEVELOPER_CATEGORY_LIST} />
            <CollapsibleMenu title="Error" path="error" contentList={ERROR_CATEGORY_LIST} />
            <CollapsibleMenu title="Zod" path="zod" contentList={ZOD_CATEGORY_LIST} />
            <CollapsibleMenu title="Supabase" path="supabase" contentList={SUPABASE_CATEGORY_LIST} />
            <CollapsibleMenu title="Vue" path="vue" contentList={VUE_CATEGORY_LIST} />
        </aside>
    );
}

export { AppSidebar };
