import { BlogCard } from "@/components/blog";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import React from "react";

interface BlogsProps {
  featured?: boolean;
  limit?: number;
}

const Blogs = async ({ featured = false, limit = 0 }: BlogsProps) => {
  const posts = await getBlogPosts();
  const displayPosts = limit > 0 ? posts.slice(0, limit) : posts;

  if (displayPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">
          No articles published yet. Check back soon!
        </p>
      </div>
    );
  }

  // Featured layout for home page - vertical list
  if (featured) {
    return (
      <section className="space-y-3 md:space-y-4">
        {displayPosts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <div className="p-3 md:p-4 border rounded hover:bg-secondary/50 transition-colors duration-200 hover:shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mt-1">
                      {post.summary}
                    </p>
                  </div>
                  <span className="text-xs whitespace-nowrap text-muted-foreground ml-2">
                    {new Date(post.publishedAt.toString()).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
      </section>
    );
  }

  // Full layout for blog page - grid
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayPosts.map((post, id) => (
        <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group">
            <BlogCard {...post} />
          </Link>
        </BlurFade>
      ))}
    </section>
  );
};

export default Blogs;
