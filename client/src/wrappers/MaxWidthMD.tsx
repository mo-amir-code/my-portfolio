import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthMD = ({
  children,
  className,
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string
}) => {
  return (
    <section id={id} className={cn(`mx-auto max-w-[700px] px-4`, className)}>{children}</section>
  );
};

export default MaxWidthMD;
