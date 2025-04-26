import { TypographyH1, TypographyP } from "@/components/custom/typography";
import { MaxWidthMD } from "@/wrappers";

const ProjectsHero = () => {
  return (
    <MaxWidthMD>
      <div className="space-y-4">
        <TypographyH1 content="Projects" />
        <TypographyP
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id delectus error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id delectus error."
          className="text-muted-foreground"
        />
      </div>
    </MaxWidthMD>
  );
};

export default ProjectsHero;
