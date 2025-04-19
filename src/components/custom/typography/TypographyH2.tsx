import { TypographyType } from "./TypographyH1";

export default function TypographyH2({ content, className }: TypographyType) {
  return (
    <h2
      className={
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 " +
        className
      }
    >
      {content}
    </h2>
  );
}
