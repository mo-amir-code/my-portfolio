import { MaxWidthMD } from "@/wrappers";
import { TypographyH2 } from "../../../typography";
import { ProjectCard, SeeMore } from "../../../common";

const Projects = () => {
  return (
    <MaxWidthMD>
      <div className="space-y-4">
        <TypographyH2 content="Projects" className="font-medium" />
        <div className="space-y-8">
          <ProjectCard
            title="Motion"
            content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
            website="/#"
            github="/#"
          />
          <ProjectCard
            title="Motion"
            content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
            website="/#"
            github="/#"
          />
          <ProjectCard
            title="Motion"
            content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
            website="/#"
            github="/#"
          />
          <ProjectCard
            title="Motion"
            content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
            website="/#"
            github="/#"
          />

          <div className="flex items-center justify-center">
            <SeeMore href="projects" />
          </div>
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default Projects;
