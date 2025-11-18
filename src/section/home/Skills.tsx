import { BLUR_FADE_DELAY } from "@/app/page";
import BlurFade from "@/components/magicui/blur-fade";
import { TypographyH2 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

const Skills = () => {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <TypographyH2 text="Skills" className="border" isBordered />
        </BlurFade>
        <div className="flex flex-wrap gap-1">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <Badge key={skill}>{skill}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
