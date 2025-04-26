import { TypographyType } from "./TypographyH1";

export default function TypographyInlineCode({
  content,
  className,
}: TypographyType) {
  return (
    <code
      className={
        `relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ` +
        className
      }
    >
      {content}
    </code>
  );
}
