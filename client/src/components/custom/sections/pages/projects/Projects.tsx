import { MaxWidthMD } from "@/wrappers";
import { TypographyH2 } from "../../../typography";
import { ProjectCard } from "../../../common";

export type ProjectsProjectsType = {
  title: string;
  projects: string[];
};

const Projects = ({ title, projects }: ProjectsProjectsType) => {
  return (
    <MaxWidthMD>
      <div className="space-y-4">
        <TypographyH2 content={title} className="font-medium" />
        <div className="space-y-8">
          {projects.map((_, idx) => (
            <ProjectCard
              key={idx}
              title="Motion"
              content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
              website="/#"
              github="/#"
            />
          ))}
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default Projects;
