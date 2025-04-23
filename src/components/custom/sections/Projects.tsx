import { MaxWidthMD } from "@/wrappers"
import { TypographyH2 } from "../typography"
import { EvervaultCard } from "../common"


const Projects = () => {
  return (
    <MaxWidthMD>
        <div className="space-y-4" >
            <TypographyH2 content="Projects" className="font-medium" />
            <div className="grid md:grid-cols-2 gap-4" >
                <EvervaultCard
                  title="Motion Components"
                  content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
                  tags={["tailwind", "nextjs", "nodejs"]}
                 />
                <EvervaultCard
                  title="Motion Components"
                  content="professional and beutiful franer motion componenets built with nextjs and tailwincss"
                  tags={["tailwind", "nextjs", "nodejs"]}
                 />
            </div>
        </div>
    </MaxWidthMD>
  )
}

export default Projects
