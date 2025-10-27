import MDEditor from '@uiw/react-md-editor'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Post } from '@/types/post';
import axios from '@/lib/axios'

function PostDetail() {
    const { slug } = useParams()
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        if(!slug) return;
        axios.get(`/posts/slug/${slug}`)
        .then(res => setPost(res.data))
        .catch(err => console.error('포스트 불러오기 실패', err))
    }, [slug])

    if(!post) return <div>로딩 중...</div>

    return (
        <div className="wmde-markdown-var">
            <MDEditor.Markdown source={post.markdownContent} className="p-6"/>
        </div>
    )
}

export default PostDetail;