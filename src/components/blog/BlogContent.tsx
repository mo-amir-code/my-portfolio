import { MDXRemote } from "next-mdx-remote/rsc";
import "./blogContent.css";
import { CodeBlock } from "../ui/code-block";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Error from "./Error";
import BlurFade from "../magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data";
import { IBlogDocument } from "@/models/Blog";
import { BlogNavigation } from "./index";

const components = {
  code: (props: any) => {
    // console.log(`[DEBUG] Code Props: ${JSON.stringify(props)}`);
    try {
      const language = props.className.split("-")[1];

      const children = props.children.split("-code-");
      const params = children[0];
      const code = children[1].substring(1); // Remove leading newline

      let fileName = "";
      let highlightLines: number[] = [];

      if (params) {
        params.split("\n").forEach((param: string) => {
          const [key, value] = param.split("=");
          if (key === "filename") {
            fileName = value;
          }
          if (key === "highlightLines") {
            highlightLines = JSON.parse(value) || [];
          }
        });
      }

      // console.log("Highlight Lines:", highlightLines);

      return (
        <CodeBlock
          filename={fileName}
          language={language}
          highlightLines={highlightLines}
          code={code}
        />
      );
    } catch (error) {
      console.log(`[DEBUG] occurred in code block: ${error}`);
      return <Error>Code Block Error</Error>;
    }
  },
  img: (props: any) => {
    try {
      const alt = props.alt;
      const src = props.src;
      const title = props.title;
      // console.log("ALT: ", alt);
      // console.log("SRC: ", src);
      let styles = null;
      try {
        // console.log("Before STYLES: ", title);
        styles = JSON.parse(title);
        // console.log("STYLES: ", styles);
      } catch (error) {
        console.log("[ERROR] ", error);
      }

      return (
        <Image
          alt={alt}
          src={src}
          loading="lazy"
          placeholder="blur"
          style={styles ?? {}}
          blurDataURL={src}
          className={"w-full h-auto"}
          height={1080}
          width={1920}
        />
      );
    } catch (error) {
      console.log(`[DEBUG] occurred in img block: ${error}`);
      return <Error>Image Block Error</Error>;
    }
  },
  a: (props: any) => {
    try {
      const content = props.children;
      const href = props.href;

      return (
        <Link href={href} target="_blank">
          <span className="w-fit inline-flex hover:underline items-center gap-1 font-medium text-link">
            <span>{content}</span>
            <span className="inline-block">
              <ArrowUpRight size={18} />
            </span>
          </span>
        </Link>
      );
    } catch (error) {
      console.log(`[DEBUG] occurred in anchor block: ${error}`);
      return <Error>Anchor Block Error</Error>;
    }
  },
};

const BlogContent = ({
  content,
  title,
  coverImage,
  publishedAt,
  summary,
  readTime,
  prevPost,
  nextPost,
  slug,
}: {
  content: string;
  title: string;
  coverImage: string;
  publishedAt?: Date;
  summary?: string;
  readTime?: number;
  prevPost?: IBlogDocument | null;
  nextPost?: IBlogDocument | null;
  slug?: string;
}) => {
  const publishedDate = publishedAt
    ? new Date(publishedAt.toString()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="blog-content space-y-8">
      {/* Navigation */}
      <BlogNavigation
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/blog" },
          { label: "article info." },
        ]}
        backLink={{ href: "/blog", label: "Back" }}
        delay={BLUR_FADE_DELAY * 0.8}
      />

      {/* Header Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 1}>
        <div className="space-y-4 w-full">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {publishedDate && (
              <div className="flex items-center gap-2">
                <time dateTime={publishedAt?.toString()}>
                  {publishedDate}
                </time>
              </div>
            )}
            {readTime && (
              <>
                <span className="hidden sm:block">•</span>
                <div className="flex items-center gap-2">
                  <span>{readTime} min read</span>
                </div>
              </>
            )}
            {summary && (
              <>
                <span className="hidden sm:block">•</span>
                <p className="text-muted-foreground line-clamp-2 md:line-clamp-none">
                  {summary}
                </p>
              </>
            )}
          </div>
        </div>
      </BlurFade>

      {/* Cover Image */}
      {coverImage && (
        <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border bg-muted">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </BlurFade>
      )}

      {/* Content */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.4}>
        <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
          <MDXRemote source={content} components={{ ...components }} />
        </div>
      </BlurFade>

      {/* Divider */}
      <div className="border-t pt-8" />

      {/* Navigation Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevPost ? (
          <BlurFade delay={BLUR_FADE_DELAY * 1.6}>
            <Link href={`/blog/${prevPost.slug}`}>
              <div className="group p-4 border rounded-lg hover:bg-secondary/50 transition-colors h-full">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  ← Previous Article
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                  {prevPost.summary}
                </p>
              </div>
            </Link>
          </BlurFade>
        ) : (
          <div />
        )}

        {nextPost ? (
          <BlurFade delay={BLUR_FADE_DELAY * 1.6}>
            <Link href={`/blog/${nextPost.slug}`}>
              <div className="group p-4 border rounded-lg hover:bg-secondary/50 transition-colors h-full">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  Next Article →
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                  {nextPost.summary}
                </p>
              </div>
            </Link>
          </BlurFade>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
};

export default BlogContent;
