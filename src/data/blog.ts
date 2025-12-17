import { connectToDB } from "@/lib/db";
import Blog, { IBlogDocument } from "@/models/Blog";
// import { BlogType } from "@/types/app/blog";
import fs from "fs";
import { unstable_cache } from "next/cache";
// import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// type Metadata = {
//   title: string;
//   publishedAt: string;
//   summary: string;
//   image?: string;
// };

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

// export async function getPost(slug: string) {
//   const filePath = path.join("content", `${slug}.mdx`);
//   let source = fs.readFileSync(filePath, "utf-8");
//   console.log("[DEBUG] Source: ", source)
//   const { content: rawContent, data: metadata } = matter(source);
//   console.log("[DEBUG] Content: ", rawContent)
//   console.log("[DEBUG] Metadata: ", metadata)
//   const content = await markdownToHTML(rawContent);
//   return {
//     source: content,
//     metadata,
//     slug,
//   };
// }

export function getPost(slug: string): Promise<IBlogDocument | null> {
  const cachedFn = unstable_cache(
    async (): Promise<IBlogDocument | null> => {
      await connectToDB();
      return Blog.findOne({ slug }).lean<IBlogDocument | null>();
    },
    ["blog-post", slug],
    {
      revalidate: 60 * 60 * 24 * 24, // 24 hours
    }
  );

  return cachedFn();
}

// async function getAllPosts(dir: string) {
//   let mdxFiles = getMDXFiles(dir);
//   return Promise.all(
//     mdxFiles.map(async (file) => {
//       let slug = path.basename(file, path.extname(file));
//       console.log("[DEBUG] Slug => ", slug)
//       let { metadata, source } = await getPost(slug);
//       return {
//         metadata,
//         slug,
//         source,
//       };
//     }),
//   );
// }

// export async function getBlogPosts() {
//   return getAllPosts(path.join(process.cwd(), "content"));
// }

export const getBlogPosts = unstable_cache(
  async (filter?: object): Promise<IBlogDocument[]> => {
    await connectToDB();

    const posts = await Blog.find(filter ?? { status: "publish" })
      .sort({ publishedAt: -1 })
      .lean<IBlogDocument[]>();

    return posts;
  },
  ["blog-posts"],
  {
    revalidate: 60 * 60 * 24 * 24, // 24 hours
    tags: ["blog-posts"],
  }
);