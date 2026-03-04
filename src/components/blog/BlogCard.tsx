import { BlogType } from "@/types/app/blog";
import Image from "next/image";

const BlogCard = (blog: BlogType) => {
  const publishedDate = new Date(blog.publishedAt.toString());
  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200); // Average 200 words per minute

  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-48 md:h-56 overflow-hidden bg-muted">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Tags/Date Row */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-xs md:text-sm text-muted-foreground font-medium">
            {publishedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-xs md:text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>

        {/* Summary */}
        <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
          {blog.summary}
        </p>

        {/* Read More Link */}
        <div className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-200">
          Read Article
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
