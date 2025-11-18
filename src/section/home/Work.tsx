import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { TypographyH2 } from "@/components/typography";
import { BLUR_FADE_DELAY } from "@/data";
import { DATA } from "@/data/resume";

const Work = () => {
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <TypographyH2 text="Work Experience" className="border" isBordered />
        </BlurFade>
        {DATA.work.map((work, id) => (
          <BlurFade key={work.company} className="border-l border-r border-b px-2 py-2" delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              technologies={(work.technologies ?? []) as any}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? "Present"}`}
              description={work.description}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default Work;
