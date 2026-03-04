import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import { DATA } from "@/data/resume";
import { Blogs } from "@/section/blog";
import { Metadata } from "next";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Blogs",
    template: `%s | ${DATA.name}`,
  },
  description: "My thoughts on software development, devOps, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const totalReadTime = Math.ceil(
    posts.reduce((acc, post) => {
      const wordCount = post.content.split(/\s+/).length;
      return acc + Math.ceil(wordCount / 200); // Average 200 words per minute
    }, 0)
  );

  return (
    <div className="py-6 md:py-12">
      <div className="space-y-8">
        {/* Navigation Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 0.8}>
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Articles</span>
            </nav>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm px-3 py-1.5 border rounded-md hover:bg-secondary/50 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </BlurFade>

        {/* Header Section */}
        <div className="space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="font-bold text-4xl md:text-5xl tracking-tighter">
              Articles & Insights
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Exploring software development, DevOps, best practices, and lessons learned from building products. 
              Read, learn, and share your thoughts.
            </p>
          </BlurFade>
        </div>

        {/* Stats Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 1.4}>
          <div className="grid grid-cols-3 gap-4 md:gap-6 border rounded-lg p-4 md:p-6">
            <div className="border-r last:border-r-0 pr-4 md:pr-6">
              <div className="text-2xl md:text-3xl font-bold">{posts.length}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Published Articles
              </p>
            </div>
            <div className="border-r last:border-r-0 px-4 md:px-6">
              <div className="text-2xl md:text-3xl font-bold">{totalReadTime}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Minutes Read
              </p>
            </div>
            <div className="px-4 md:px-6">
              <div className="text-2xl md:text-3xl font-bold">
                {posts.length > 0 ? Math.round(totalReadTime / posts.length) : 0}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Avg. Read Time
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Blogs Section */}
        <div>
          <BlurFade delay={BLUR_FADE_DELAY * 1.6}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Latest Articles
              </h2>
            </div>
          </BlurFade>
          <Blogs />
        </div>
      </div>
    </div>
  );
}
