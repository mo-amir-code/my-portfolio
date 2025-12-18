import { MDXRemote } from "next-mdx-remote/rsc";
import "./blogContent.css";
import { CodeBlock } from "../ui/code-block";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Error from "./Error";

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

const BlogContent = ({ content }: { content: string }) => {
  return (
    <article className="blog-content">
      <MDXRemote source={content} components={{ ...components }} />
    </article>
  );
};

export default BlogContent;
