import { TypographyType } from "./TypographyH1";

export default function TypographyH3({
  content,
  className,
}: TypographyType) {
  return (
    <h3
      className={
        "scroll-m-20 text-2xl font-semibold tracking-tight " + className
      }
    >
      {content}
    </h3>
  );
}
