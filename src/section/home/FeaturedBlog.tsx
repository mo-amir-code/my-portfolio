import Link from "next/link";
import { Blogs } from "../blog";
import { ChevronDown } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";

const FeaturedBlog = () => {
  return (
    <section id="blog" className="max-w-2xl">
      {/* <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-4">
          Latest Articles
        </h2>
      </BlurFade> */}
      
      <div className="space-y-3 pt-4">
        <Blogs featured={true} limit={3} />
      </div>

      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href={"/blog"}
          className="w-full mt-5 flex items-center gap-1 justify-center text-sm hover:text-primary transition-colors"
        >
          <span>See All Articles</span>
          <span>
            <ChevronDown size={18} />
          </span>
        </Link>
      </BlurFade>
    </section>
  );
};

export default FeaturedBlog;
