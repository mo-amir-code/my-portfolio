import InputField from "@/components/custom/common/input/InputFIeld";
import { TypographyH1, TypographyP } from "@/components/custom/typography";
import { MaxWidthMD } from "@/wrappers";

const BlogHero = () => {
  return (
    <MaxWidthMD>
      <div className="space-y-4">
        <TypographyH1 content="Blog" />
        <TypographyP
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id delectus error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id delectus error."
          className="text-muted-foreground"
        />
        <InputField type="text" icon="search" placeholder="search articles" />
      </div>
    </MaxWidthMD>
  );
};

export default BlogHero;
