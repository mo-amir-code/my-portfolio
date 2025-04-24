import { MaxWidthMD } from "@/wrappers";
import { TypographyH2 } from "../typography";
import { BlogPostCard, SeeMore } from "../common";

const Blogs = () => {
  return (
    <MaxWidthMD>
      <div className="space-y-4">
        <TypographyH2 content="Recent Blogs" className="font-medium" />
        <div className="space-y-8">
          <BlogPostCard />
          <BlogPostCard />

          <div className="flex items-center justify-center">
            <SeeMore />
          </div>
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default Blogs;
