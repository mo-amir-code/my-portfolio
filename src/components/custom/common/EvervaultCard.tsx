import { Icon } from "@/components/ui/EverVaultCard";
import React from "react";
import { TypographyH4, TypographyP } from "../typography";

export type EverVaultCardType = {
  logo?: string;
  title: string;
  content: string;
  tags: string[];
};

export default function CustomCard({
  title,
  content,
  tags,
  logo,
}: EverVaultCardType) {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <TypographyH4 content={title} />
      <TypographyP content={content} className="opacity-90 mt-4" />
      <div className="flex items-center gap-1" >
        {tags.map((tag, idx) => (
          <span key={idx} className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-sm mt-4 text-black dark:text-white px-1 py-0.5 italic">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
