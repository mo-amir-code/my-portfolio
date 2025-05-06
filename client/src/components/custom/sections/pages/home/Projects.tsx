"use client";
import { MaxWidthMD } from "@/wrappers";
import { TypographyH3 } from "../../../typography";
import { ProjectCard, SeeMore } from "../../../common";
import { projectsData } from "@/lib/data";
import { useState } from "react";

const Projects = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  return (
    <MaxWidthMD id="projects">
      <div className="space-y-4">
        <TypographyH3 content="Projects" className="font-medium" />
        <div className="space-y-8">
          {(isExpand ? projectsData : projectsData.slice(0, 2)).map(
            ({ title, content, website, github, users }, idx) => (
              <ProjectCard
                key={idx}
                title={title}
                content={content}
                website={website}
                github={github}
                users={users}
              />
            )
          )}

          {!!!isExpand && (
            <div
              onClick={() => setIsExpand(true)}
              className="flex items-center justify-center cursor-pointer"
            >
              <SeeMore text="Projects" />
            </div>
          )}
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default Projects;
