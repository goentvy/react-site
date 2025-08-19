import { Button, Separator } from "../ui";

function AppFooter() {
    return (
        <footer className="w-full flex flex-col items-center justify-center bg-[#121212]">
            <div className="w-full max-w-[1328px] flex flex-col gap-6 p-6 pb-18">
                <div className="w-full flex items-start justify-between">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col items-start">
                        </div>
                        
                    </div>
                </div>
                <Separator />
                <div className="w-full flex items-start justify-start">
                    <div className="h-full flex flex-col justify-start">
                        <div className="flex flex-col">
                            <p className="h-10 text-base font-semibold">Contact</p>
                            <div className="flex flex-col items-start gap-1">
                                <p>문의 : entvyv@gmail.com</p>
                            </div>
                        </div>
                        <p>© Entvy Team all rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { AppFooter };
