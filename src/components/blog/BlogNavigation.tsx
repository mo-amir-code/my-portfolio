"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogNavigationProps {
  breadcrumbs: BreadcrumbItem[];
  backLink?: {
    href: string;
    label?: string;
  };
  delay?: number;
}

const BlogNavigation = ({
  breadcrumbs,
  backLink,
  delay = BLUR_FADE_DELAY * 0.8,
}: BlogNavigationProps) => {
  return (
    <BlurFade delay={delay}>
      <div className="flex items-center justify-between py-4 border-b">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm flex-wrap">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground truncate max-w-xs">
                  {item.label}
                </span>
              )}

              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </nav>

        {/* Back Button */}
        {backLink && (
          <Link
            href={backLink.href}
            className="flex items-center gap-2 text-sm px-3 py-1.5 border rounded-md hover:bg-secondary/50 transition-colors duration-200 flex-shrink-0 ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backLink.label || "Back"}</span>
          </Link>
        )}
      </div>
    </BlurFade>
  );
};

export default BlogNavigation;
