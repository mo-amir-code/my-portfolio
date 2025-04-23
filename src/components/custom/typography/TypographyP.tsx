import { cn } from "@/lib/utils";
import { TypographyType } from "./TypographyH1";

export default function TypographyP({ content, className }: TypographyType) {
  return <p className={cn("leading-7", className)}>{content}</p>;
}
