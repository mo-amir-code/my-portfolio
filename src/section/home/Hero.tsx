import { BLUR_FADE_DELAY } from "@/app/page";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import React from "react";

const Hero = () => {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex border">
          <div className="flex-col flex flex-1 max-sm:justify-center">
            <div className="border-b flex-2 pt-4 pl-2">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`hi, i'm ${DATA.name.split(" ")[1]} 👋`}
              />
            </div>
            <div className="flex items-center flex-1 pl-2">
              <span className="translate-y-[20%]" >
                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </span>
            </div>
          </div>
          <div className="pt-2 border-l flex items-center justify-center px-2">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
