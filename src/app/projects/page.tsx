import { ProjectsHero, ProjectsProjects } from "@/components/custom/sections/pages/projects"


const Projects = () => {
  return (
    <div className="space-y-12" >
        <ProjectsHero />      
        <ProjectsProjects title="Full-Stack" projects={["a", "b", "c", "d", "e"]} />
        <ProjectsProjects title="Front-End" projects={["a", "b", "c", "d", "e"]} />
    </div>
  )
}

export default Projects
