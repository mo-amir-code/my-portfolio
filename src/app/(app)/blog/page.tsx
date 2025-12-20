import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import { DATA } from "@/data/resume";
import { Blogs } from "@/section/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blogs",
    template: `%s | ${DATA.name}`,
  },
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  return (
    <div className="py-6 md:py-12">
      <div>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blogs</h1>
        </BlurFade>
        <Blogs />
      </div>
    </div>
  );
}
