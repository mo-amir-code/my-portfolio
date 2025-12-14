import { BlogType } from "@/types/app/blog";

const BlogCard = (blog: BlogType) => {
  return (
    <div className="p-4 pt-0 relative border flex items-center justify-between">
      <h2 className="font-semibold text-2xl">{blog.title}</h2>
      <span className="absolute bottom-0 border-t border-l right-0 px-2 py-1 text-sm text-card-foreground">
        {new Date(blog.publishedAt.toString()).toDateString()}
      </span>
    </div>
  );
};

export default BlogCard;
