import { MaxWidthMD } from "@/wrappers";
import { TypographyH1 } from "../typography";

const Hero = () => {
  return (
    <MaxWidthMD className="pt-4" >
      <div className="flex">
        <div>
          <TypographyH1 content="Mo Amir" />
        </div>
      </div>
    </MaxWidthMD>
  );
};

export default Hero;
