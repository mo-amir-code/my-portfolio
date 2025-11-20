"use client";
import { TypographyH2 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BlogType } from "@/types/app/blog";
import { ArrowUp, Image, Link, Loader2 } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ChangeEvent,
  Suspense,
  use,
  useCallback,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { toast } from "sonner";

// import { HomeHero } from "@/section/home";

// const components = {
//   HomeHero: (props:any) => (
//     <HomeHero {...props} className="large-text">
//       {props.children}
//     </HomeHero>
//   ),
// };

const page = () => {
  const [code, setCode] = useState<string>("");
  const [to, setTO] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isSlugExist, setIsSlugExist] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Error states
  const [errors, setErrors] = useState<{
    title?: string;
    slug?: string;
    publishedAt?: string;
    summary?: string;
    content?: string;
  }>({});

  const handleOnImageSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const imagePath = event.target.value;
      // TOOD: deploy image then insert here
      const imagePart = `![alterere](${imagePath})`;
      setCode((prev) => prev + imagePart);
    },
    []
  );

  const getLastWord = useCallback(() => {
    if (code.length === 0) return "";
    if (code[code.length - 1] === " ") return "";

    let word = "";
    for (let i = code.length - 1; i >= 0; i--) {
      if (code[i] === " " || code[i] === "\n") break;
      word = code[i] + word;
    }
    return word;
  }, [code]);

  const handleOnLink = useCallback(() => {
    let link = "";

    let lastWord = getLastWord();

    if (lastWord.length === 0) {
      link = `[](Link here...)`;
    } else {
      link = `[${lastWord}](Link)`.trim();
      let newCode = code.replace(lastWord, link);
      setCode(newCode);
      return;
    }

    setCode((prev) => prev + link);
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, [code, setCode, contentRef]);

  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!slug.trim()) newErrors.slug = "Slug is required";
    if (!publishedAt) newErrors.publishedAt = "Publish date is required";
    if (!summary.trim()) newErrors.summary = "Summary is required";
    if (!code.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, slug, publishedAt, summary, code]);

  const handlePublish = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsLoading(true);

      const formData: BlogType = {
        title,
        slug,
        publishedAt: new Date(publishedAt),
        summary,
        content: code,
      };

      try {
        const res = await axios.post("/api/blog", formData);
        console.log("[DEBUG] Resposne is hjere: ", res);
        toast.success("Blog published successfully!");
      } catch (error) {
        console.error(`[ERROR] Occurred while publishing blog: ${error}`);
        toast.error("Failed to publish blog");
      } finally {
        setIsLoading(false);
      }
    },
    [title, slug, publishedAt, summary, code, validateForm]
  );

  const handleSlugCheck = useCallback(
    async (value: string) => {
      if (to) {
        clearTimeout(to);
      }

      const currTO = setTimeout(async () => {
        if (value.length === 0) {
          setIsSlugExist(null);
          setSlug("");
          return;
        }

        const finalSlug = value
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, " ")
          .replace(/ /g, "-");
        console.log(`[DEBUG] Final Slug: ${finalSlug}`);

        setSlug(finalSlug);

        try {
          const res = await axios.get(`/api/blog/${finalSlug}/check`);
          if (res.data.exist) {
            setIsSlugExist(true);
            setErrors((prev) => ({ ...prev, slug: undefined }));
          } else {
            setErrors((prev) => ({ ...prev, slug: "Slug is not available" }));
            setIsSlugExist(false);
          }
        } catch (error) {
          console.error(`[ERROR] Occurred error while slug checking: ${error}`);
        }
      }, 500);

      setTO(currTO);
    },
    [to, setTO]
  );

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      handleSlugCheck(e.target.value);
    },
    [setTitle, handleSlugCheck]
  );

  return (
    <div className="w-full py-12 ">
      <Tabs defaultValue="write">
        <TabsList>
          <TabsTrigger type="button" value="write" disabled={isLoading}>
            Write
          </TabsTrigger>
          <TabsTrigger type="button" value="preview" disabled={isLoading}>
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="write">
          <form onSubmit={handlePublish} className="space-y-4">
            {/* Metadata */}
            <div className="space-y-4">
              <TypographyH2 text="Metadata" />
              <div className="space-y-3">
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="title">Title</Label>
                  <div>
                    <Input
                      type="text"
                      autoFocus
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Enter title here..."
                      className={`${errors.title ? "border-red-600" : ""}`}
                      disabled={isLoading}
                    />
                    {errors.title && (
                      <span className="text-red-600 text-xs pl-1">
                        {errors.title}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="slug">Slug</Label>
                  <div>
                    <Input
                      type="text"
                      id="slug"
                      value={slug}
                      onChange={(e) => handleSlugCheck(e.target.value)}
                      placeholder="Enter slug here..."
                      className={`${errors.slug ? "border-red-600" : ""}`}
                      disabled={isLoading}
                    />
                    {errors.slug ? (
                      <span className="text-red-600 text-xs pl-1">
                        {errors.slug}
                      </span>
                    ) : isSlugExist !== null ? (
                      isSlugExist ? (
                        <span className="text-green-600 text-xs pl-1">
                          Slug is available
                        </span>
                      ) : (
                        <span className="text-red-600 text-xs pl-1">
                          Slug is not available
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <div>
                    <Input
                      type="date"
                      id="publishedAt"
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      placeholder="Publish date"
                      className={`${
                        errors.publishedAt ? "border-red-600" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {errors.publishedAt && (
                      <span className="text-red-600 text-xs pl-1">
                        {errors.publishedAt}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="summary">Summary</Label>
                  <div>
                    <Textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Enter summary here..."
                      className={`${errors.summary ? "border-red-600" : ""}`}
                      disabled={isLoading}
                    />
                    {errors.summary && (
                      <span className="text-red-600 text-xs pl-1">
                        {errors.summary}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Source */}
            <div>
              <TypographyH2 text="Content" />
              <div className="flex items-center justify-center bg-background">
                <div className={`w-full border bg-card shadow-lg`}>
                  {/* Search Input */}
                  <div className="p-4">
                    <textarea
                      placeholder="Write here"
                      className={`w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                      rows={15}
                      ref={contentRef}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t" />

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between p-3">
                    {/* Left Section */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => imgRef.current && imgRef.current.click()}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        <input
                          ref={imgRef}
                          type="file"
                          onChange={(e) => handleOnImageSelect(e)}
                          accept="image/*"
                          className=" hidden"
                          disabled={isLoading}
                        />
                        <Image className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOnLink()}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        <Link className="h-4 w-4" />
                      </button>
                      {/* <span className="text-sm text-muted-foreground">Auto</span> */}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                      {/* <span className="text-sm text-muted-foreground">52% used</span> */}
                      <button
                        type="submit"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowUp className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          <Suspense fallback={<p>Loading...</p>}>
            {/* <MDXRemote source={code} components={{ ...components }} /> */}
            <MDXRemote source={code} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
