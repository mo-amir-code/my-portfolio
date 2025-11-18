import { cn } from "@/lib/utils";
import { TypographyType } from "@/types/components/typography";

const TypographyH2 = ({ text, className, isBordered }: TypographyType) => {
  return (
    <h2 className={cn("text-xl font-bold", className)}>
      <span className={`${isBordered ? "pl-2 pr-4 border-r" : ""}`}>
        {text}
      </span>
    </h2>
  );
};

export default TypographyH2;
