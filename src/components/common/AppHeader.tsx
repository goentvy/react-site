import { Separator } from "../ui/separator";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";

function AppHeader() {
    return (
        <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#333333]">
            <div className="w-full max-w-[1328px] flex items-center justify-start px-6 py-3">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-5">
                        <div className="font-semibold text-lg cursor-pointer">과제 방</div>
                        <Separator orientation="vertical" className="!h-4" />
                        <div className="font-semibold text-lg cursor-pointer">포트폴리오</div>
                        <Separator orientation="vertical" className="!h-4" />
                        {/* Breadcrumb 웹페이지 네비게이션 */}
                        <BreadcrumbWithCustomSeparator />
                    </div>
                </div>
            </div>
        </header>
    );
}

export { AppHeader };
