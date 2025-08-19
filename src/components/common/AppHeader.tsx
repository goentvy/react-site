import { NavLink } from "react-router";
import { Separator } from "../ui/separator";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";


function AppHeader() {
    return (
        <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#333333]">
            <div className="w-full max-w-[1328px] flex items-center justify-start px-6 py-3">
                {/* 로고 & 네비게이션 메뉴 UI */}
                <div className="flex items-center gap-5">
                    {/* <img src="https://github.com/9diin.png" alt="@LOGO" className="w-6 h-6 cursor-pointer" /> */}
                    <div className="flex items-center gap-5">
                        <div className="font-semibold text-lg cursor-pointer">과제 방</div>
                        <Separator orientation="vertical" className="!h-4" />
                        <div className="font-semibold text-lg cursor-pointer">포트폴리오</div>
                        <Separator orientation="vertical" className="!h-4" />
                        <BreadcrumbWithCustomSeparator />
                    </div>
                </div>
            </div>
        </header>
    );
}

export { AppHeader };
