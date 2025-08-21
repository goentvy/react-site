import { Separator } from "../ui/separator";
// import { ModeToggle } from "../theme-toggle";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";
import { Link } from 'react-router';

function AppHeader() {
    return (
        <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#20232a]">
            <div className="w-full max-w-[1328px] flex items-center justify-start px-6 py-3">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-5">
                        <div className="font-semibold text-lg cursor-pointer">
                            <Link to="/">Entvy</Link>
                        </div>
                        <Separator orientation="vertical" className="!h-4" />
                        <div className="font-semibold text-lg cursor-pointer">
                            <Link to="/">과제방</Link>
                        </div>
                        <Separator orientation="vertical" className="!h-4" />
                        <div className="font-semibold text-lg cursor-pointer">
                            <Link to="/">포트폴리오</Link>
                        </div>
                        <Separator orientation="vertical" className="!h-4" />
                        {/* Breadcrumb 웹페이지 네비게이션 */}
                        <BreadcrumbWithCustomSeparator />
                    </div>
                    {/* <ModeToggle /> */}
                </div>
            </div>
        </header>
    );
}

export { AppHeader };
