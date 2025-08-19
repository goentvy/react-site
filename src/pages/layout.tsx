import { Outlet } from "react-router";
import { AppFooter, AppHeader, AppSidebar } from "../components/common";

export default function RootLayout() {
    return (
        <div className="page">
            <AppHeader />
            <div className="container">
                <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
                    <AppSidebar />
                    <Outlet />
                </main>
            </div>
            <AppFooter />
        </div>
    );
}
