import { Link } from "react-router";
import { SkeletonHotTopic, SkeletonNewTopic } from "../components/skeleton";

function App() {
    return (
        <section className="flex-1 flex flex-col gap-12">
            {/* Layout 소개 */}
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <img src="./assets/gifs/gif-001.gif" alt="@IMG" className="w-7 h-7" />
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Layout은 무엇으로?</h4>
                    </div>
                    <p className="md:text-base text-muted-foreground">
                        <Link to="https://ui.shadcn.com/" target="_blank">Shadcn UI</Link>를 이용해보면 이러한 Layout을 쉽게 구성가능합니다.
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    <SkeletonHotTopic />
                    <SkeletonHotTopic />
                    <SkeletonHotTopic />
                    <SkeletonHotTopic />
                </div>
            </div>
            {/* 공부거리 */}
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <img src="./assets/gifs/gif-002.gif" alt="@IMG" className="w-7 h-7" />
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">공부거리</h4>
                    </div>
                    <p className="md:text-base text-muted-foreground">공부는 끝이없네요.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <SkeletonNewTopic />
                    <SkeletonNewTopic />
                    <SkeletonNewTopic />
                    <SkeletonNewTopic />
                </div>
            </div>
        </section>
    );
}

export default App;
