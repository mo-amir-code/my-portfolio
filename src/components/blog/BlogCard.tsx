import { BlogType } from "@/types/app/blog";

const BlogCard = (blog: BlogType) => {
  return (
    <div className="p-2 md:p-4 before:relative relative border">
      <h2 className="font-semibold mx:text-2xl text-lg">{blog.title}</h2>
      <span className="absolute top-full -translate-y-1/2 border right-0 px-1 md:px-2 py-[2px] md:py-1 text-xs md:text-sm text-card-foreground">
        {new Date(blog.publishedAt.toString()).toDateString()}
      </span>
    </div>
  );
};

export default BlogCard;
