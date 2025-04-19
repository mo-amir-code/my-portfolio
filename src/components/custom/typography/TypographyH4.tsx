import { TypographyType } from "./TypographyH1";

export default function TypographyH4({ content, className }: TypographyType) {
  return (
    <h4
      className={
        "scroll-m-20 text-xl font-semibold tracking-tight " + className
      }
    >
      {content}
    </h4>
  );
}
