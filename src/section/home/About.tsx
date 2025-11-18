import BlurFade from "@/components/magicui/blur-fade";
import { TypographyH2 } from "@/components/typography";
import { BLUR_FADE_DELAY } from "@/data";
import { DATA } from "@/data/resume";
import React from "react";
import Markdown from "react-markdown";

const About = () => {
  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <TypographyH2 text="About" className="border" isBordered />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <Markdown className="prose max-w-full border-b border-r border-l p-2 text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          {DATA.summary}
        </Markdown>
      </BlurFade>
    </section>
  );
};

export default About;
