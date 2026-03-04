import { IBlogDocument } from "@/models/Blog";
import Image from "next/image";
import BlogStatusBadge from "./BlogStatusBadge";

interface AdminBlogCardProps {
  blog: IBlogDocument;
}

const AdminBlogCard = ({ blog }: AdminBlogCardProps) => {
  const publishedDate = new Date(blog.publishedAt.toString()).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-40 overflow-hidden bg-muted">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header with Status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {blog.title}
          </h3>
          <BlogStatusBadge status={blog.status as any} className="flex-shrink-0" />
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {blog.summary}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-3">
            <span>{publishedDate}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;
