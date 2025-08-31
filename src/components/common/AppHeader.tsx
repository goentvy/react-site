import { Separator } from "../ui/separator";
// import { ModeToggle } from "../theme-toggle";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";
import { Link } from 'react-router';

interface HeaderProps {
    onToggleMenu: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({ onToggleMenu }) => {
    return (
        <header className="fixed left-0 top-0 z-10 w-full flex items-center justify-center bg-[#20232a]">
            <div className="w-full max-w-[1328px] flex items-center justify-start px-3 lg:px-6 py-3">
                <div className="flex items-center">
                    <div className="flex items-center gap-3 lg:gap-5">
                        {/* 모바일 토글 메뉴 버튼 */}
                        <button className="menu-toggle block lg:hidden text-white text-lg" onClick={onToggleMenu}>
                            ☰
                        </button>
                        <div className="font-semibold text-sm lg:text-lg cursor-pointer">
                            <Link to="/">Entvy</Link>
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
