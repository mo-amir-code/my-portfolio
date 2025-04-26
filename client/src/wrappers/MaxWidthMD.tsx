import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthMD = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn(`mx-auto max-w-[700px] px-4`, className)}>{children}</section>
  );
};

export default MaxWidthMD;
