import { MaxWidthMD } from "@/wrappers";
import { TypographyCode, TypographyH1, TypographyP } from "../../../typography";
import { Profile } from "../../../common";
import profileImg from "@/assests/profile.jpg";
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL, YOUTUBE_URL } from "@/lib/data";
import { LinkPreview } from "@/components/ui";

const Hero = () => {
  return (
    <MaxWidthMD className="pt-4">
      <div className="flex justify-between flex-col-reverse md:flex-row gap-4 md:gap-0">
        <div className="flex-[0.8]">
          <div>
            <TypographyH1 content="Mo Amir" />
            <div className="flex items-start gap-1">
              <TypographyP
                content="Building"
                className="text-muted-foreground"
              />
              <TypographyCode content="Portfolio" />
              <TypographyP
                content=", Learning "
                className="text-muted-foreground"
              />
              <TypographyCode content="DSA" />
            </div>

            <div className="leading-7 translate-y-4 md:max-w-[90%] opacity-65">
              <span className="text-muted-foreground">
                A Full Stack Engineer, Freelancer and smart problem solver. Find me on
              </span>
              <LinkPreview url={TWITTER_URL}>
                <span>{" "}Twitter,</span>
              </LinkPreview>
              <LinkPreview url={LINKEDIN_URL}>
                <span>{" "}Linkedin,</span>
              </LinkPreview>
              <LinkPreview url={GITHUB_URL}>
                <span>{" "}Github, </span>
              </LinkPreview>
              <span>and</span>
              <LinkPreview url={YOUTUBE_URL}>
                <span>{" "}YouTube.</span>
              </LinkPreview>
            </div>
          </div>
        </div>
        <div className="flex-[0.2]">
          <div className="max-w-20">
            <Profile imageUrl={profileImg.src} className="md:-translate-y-2" />
          </div>
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default Hero;
