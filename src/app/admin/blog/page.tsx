import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import AdminBlogCard from "@/components/admin/AdminBlogCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Blog Management",
  description: "Manage your blog articles",
};

export default async function BlogPage() {
  const posts = await getBlogPosts({});

  return (
    <div className="py-12 max-w-4xl mx-auto w-full space-y-8">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-4xl tracking-tighter">Blog Management</h1>
          <Link href="/admin/blog/write">
            <Button className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4" />
              Write Article
            </Button>
          </Link>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
        <div className="grid grid-cols-3 gap-4 border rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.status === "publish").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Published</p>
          </div>
          <div className="text-center border-l border-r">
            <div className="text-2xl font-bold text-yellow-600">
              {posts.filter(p => p.status === "draft").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Drafts</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {posts.filter(p => p.status === "deleted").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Deleted</p>
          </div>
        </div>
      </BlurFade>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 1.4 + id * 0.05} key={post._id?.toString()}>
            <Link href={`/admin/blog/write?blogId=${post._id}`}>
              <AdminBlogCard blog={post as any} />
            </Link>
          </BlurFade>
        ))}
      </div>

      {posts.length === 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 1.4}>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles yet</p>
            <Link href="/admin/blog/write">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Create Your First Article
              </Button>
            </Link>
          </div>
        </BlurFade>
      )}
    </div>
  );
}
