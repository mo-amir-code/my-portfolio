import { BlogCard } from "@/components/blog";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import React from "react";

const Blogs = async () => {
  const posts = await getBlogPosts();

  return (
    <section className="space-y-5 md:space-y-6">
      {posts.map((post, id) => (
        <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <BlogCard {...post} />
          </Link>
        </BlurFade>
      ))}
    </section>
  );
};

export default Blogs;
