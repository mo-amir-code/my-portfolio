import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { TypographyH2 } from "@/components/typography";
import { BLUR_FADE_DELAY } from "@/data";
import { DATA } from "@/data/resume";

const Education = () => {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <TypographyH2 text="Education" className="border" isBordered />
        </BlurFade>
        {DATA.education.map((education, id) => (
          <BlurFade
            key={education.school}
            delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            className="border-l border-r border-b px-2 py-2"
          >
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              technologies={[]}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} - ${education.end}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default Education;
