import { TypographyType } from "./TypographyH1";

export default function TypographyP({ content, className }: TypographyType) {
  return (
    <p className={"leading-7 [&:not(:first-child)]:mt-6 " + className}>
      {content}
    </p>
  );
}
