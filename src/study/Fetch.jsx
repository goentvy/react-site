import { useState, useEffect } from 'react';

function Fetch() {
    const [ posts, setPosts ] = useState([]);

    useEffect(
        () => {
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then(Response => Response.json())
            .then(json => setPosts(json))
        }, [])
        
    return (
        <div>
            <h3>게시판 목록</h3>
            <hr />
            {posts.map( post =>
                (
                    <ul key={post.id}>
                        <li>{post.title}</li>
                        <li>{post.body}</li>
                    </ul>
                )
            )}
        </div>
    );
}

export default Fetch;