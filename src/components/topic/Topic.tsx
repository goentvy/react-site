import type { Post } from '@/types/post'
import { Link } from 'react-router-dom';

const Topic = ({ title, slug, author, category, createdAt }: Post) => {
  return (
    <div className="w-full p-4 rounded-md border border-border bg-card hover:shadow-md transition">
      <div className="text-xs text-muted-foreground mb-1">
        {author} | {new Date(createdAt).toLocaleDateString()}
      </div>

      <Link to={`/posts/${slug}`}>
        <h3 className="text-lg font-semibold leading-tight mb-1 line-clamp-2">
            {title}
        </h3>
      </Link>

      <div className="text-sm text-primary font-medium">{category}</div>
    </div>
  );
};


export default Topic;