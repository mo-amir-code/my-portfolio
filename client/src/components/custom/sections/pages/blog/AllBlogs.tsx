import { MaxWidthMD } from "@/wrappers";
import { TypographyH2 } from "../../../typography";
import { BlogPostCard } from "../../../common";

const AllBlogs = () => {
  return (
    <MaxWidthMD>
      <div className="space-y-4">
        <TypographyH2 content="All Blogs" className="font-medium" />
        <div className="space-y-8">
          <BlogPostCard />
          <BlogPostCard />
          <BlogPostCard />
          <BlogPostCard />
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default AllBlogs;
