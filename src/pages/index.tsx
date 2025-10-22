import { Link } from "react-router";
import { SkeletonHotTopic, SkeletonNewTopic } from "../components/skeleton";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Topic from "@/components/topic/Topic";

interface Post {
    id: number
    title: string
    slug: string
    author: string
    category: string
    imageUrl: string
    createdAt: string
}

function App() {
    const [hotPosts, setHotPosts] = useState<Post[] | null>(null)
    const [newPosts, setNewPosts] = useState<Post[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hotPost, newPost] = await Promise.all([
                    axios.get('/posts/latest'),
                    axios.get('/posts/random'),
                ])
                setHotPosts(hotPost.data)
                setNewPosts(newPost.data)
            } catch(err) {
                console.error('데이터 불러오기 실패', err)
            }
        }

        fetchData()
    }, [])

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        hotPosts ? 
                            hotPosts.map(post => (
                                <Topic key={post.id} {...post}/>
                            )) : 
                                <SkeletonHotTopic />
                    }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        newPosts ? 
                            newPosts.map(post => (
                                <Topic key={post.id} {...post}/>
                            )) : 
                                <SkeletonNewTopic />
                    }
                </div>
            </div>
        </section>
    );
}

export default App;
