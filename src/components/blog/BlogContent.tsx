import { MDXRemote } from "next-mdx-remote/rsc";
import "./index.css";
import { CodeBlock } from "../ui/code-block";
import Image from "next/image";

const components = {
  code: (props: any) => {
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
  },
  img: (props: any) => {
    const alt = props.alt;
    const src = props.src;
    // console.log("ALT: ", alt);
    // console.log("SRC: ", src);

    return (
      <Image
        alt={alt}
        src={src}
        loading="lazy"
        placeholder="blur"
        blurDataURL={src}
        className="w-full"
        width={1000}
        height={1000}
      />
    );
  },
};

const BlogContent = ({ content }: { content: string }) => {
  return (
    <article>
      <MDXRemote source={content} components={{ ...components }} />
    </article>
  );
};

export default BlogContent;
