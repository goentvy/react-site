import { Outlet } from "react-router";
import { AppFooter, AppHeader, AppSidebar } from "../components/common";
import { useCallback, useState } from "react";

export default function RootLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(o => !o);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <div className="page">
            <AppHeader onToggleMenu={toggleMenu}/>
            <div className="container">
                <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
                    <AppSidebar isOpen={isMenuOpen} onClose={closeMenu}/>
                    <Outlet />
                </main>
            </div>
            <AppFooter />

            {/* 모바일 오버레이 */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMenu}
                />
            )}
        </div>
    );
}
