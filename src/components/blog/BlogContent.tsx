import { MDXRemote } from "next-mdx-remote/rsc";
import "./index.css";
import { CodeBlock } from "../ui/code-block";

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
};

const BlogContent = ({ content }: { content: string }) => {
  return (
    <article>
      <MDXRemote source={content} components={{ ...components }} />
    </article>
  );
};

export default BlogContent;
