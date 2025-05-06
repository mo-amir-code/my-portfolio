"use client"
import React, { useEffect, useState } from "react";
import { TypographyP } from "../typography";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ProjectCardType = {
  title: string;
  content: string;
  users?: number;
  website?: string;
  github?: string;
};

export default function CustomCard({
  title,
  content,
  users = 0,
  website,
  github,
}: ProjectCardType) {
  const [gh, setGH] = useState<string[]>([]);

  useEffect(() => {
    setGH(github ? github.split("#") : []);
  }, []);

  return (
    <div className="relative md:max-w-[60%] space-y-2">
      <TypographyP
        content={title + `${users > 0 ? `(${users}+ users)` : ""} `}
        className="text-sm"
      />
      <TypographyP
        content={content}
        className="text-muted-foreground text-sm"
      />

      <div className="flex items-center gap-6 opacity-85">
        {!!website && (
          <Link
            href={website}
            className="flex items-center gap-1 hover:underline"
            target="_blank"
          >
            <EarthIcon />
            <TypographyP content="Website" className="text-sm" />
          </Link>
        )}
        {!!github &&
          gh.map((navLink, idx) => (
            <Link
              key={idx}
              href={navLink}
              className="flex items-center gap-1 hover:underline"
              target="_blank"
            >
              <GithubIcon />
              <TypographyP content="View Repo" className="text-sm" />
            </Link>
          ))}
      </div>
    </div>
  );
}

export const EarthIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-earth-icon lucide-earth"
    >
      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
      <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
      <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export const GithubIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-github-icon lucide-github", className)}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
};
