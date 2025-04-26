export type TypographyType = {
  content: string;
  className?: string;
};

export default function TypographyH1({
  content,
  className,
}: TypographyType) {
  return (
    <h1
      className={
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl " +
        className
      }
    >
      {content}
    </h1>
  );
}
