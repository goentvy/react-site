import { resolveImageUrl } from '@/lib/utils';
import { Skeleton } from '../ui';

interface Post {
  title: string
  slug: string
  author: string
  category: string
  imageUrl: string
  createdAt: string
}

const Topic = ({ title, slug, author, category, imageUrl, createdAt }: Post) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full h-70">
                <img src={resolveImageUrl(imageUrl)} alt={title} />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-2">
                    <div className="w-full h-3">{category} | {title}</div>
                    <div className="w-full h-[14px]">{author} | {new Date(createdAt).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );
};

export default Topic;