import Link from "next/link";
import { Blogs } from "../blog";
import { ChevronDown } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";

const FeaturedBlog = () => {
  return (
    <section id="blog" className="max-w-2xl">
      <div className="w-full max-h-[150px] md:max-h-[200px] overflow-hidden pt-2">
        <Blogs />
      </div>

      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href={"/blog"}
          className="w-full mt-5 flex items-center gap-1 justify-center text-sm"
        >
          <span>See All Blogs</span>
          <span>
            <ChevronDown size={18} />
          </span>
        </Link>
      </BlurFade>
    </section>
  );
};

export default FeaturedBlog;
