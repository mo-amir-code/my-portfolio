"use client";
import { TypographyH2 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogType } from "@/types/app/blog";
import { ArrowUp, ImageIcon, Link, Loader2, TimerReset, X } from "lucide-react";
import {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { BlogContent } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { getWithExpiry, removeWithKey, setWithExpiry } from "@/lib/utils";
import { BlogStatusType } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOG_STATUS } from "@/data/data";
import { httpAxios } from "@/config/axios";
import Image from "next/image";

const BlogWriter = () => {
  const [code, setCode] = useState<string>("");
  const [to, setTO] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [contentTO, setContentTO] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isSlugExist, setIsSlugExist] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<(BlogType & { _id?: string }) | null>(null);
  const [isPreviewHide, setIsPreviewHide] = useState<boolean>(true);
  const [isCustomSlug, setIsCustomSlug] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");
  const localBlogId = `content-${blogId}`;

  // Form states
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [summary, setSummary] = useState<string>("");
  const [status, setStatus] = useState<BlogStatusType>("draft");

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Error states
  const [errors, setErrors] = useState<{
    title?: string;
    coverImage?: string;
    slug?: string;
    publishedAt?: string;
    summary?: string;
    content?: string;
  }>({});

  const handleToUploadImageAndGetURL = useCallback(
    async (file: File | undefined) => {
      const newForm = new FormData();
      newForm.append("image", file!);

      const res = await httpAxios.post("/blog/image/upload", newForm);
      return res.data.data.url;
    },
    []
  );

  const handleOnImageSelect = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      try {
        // console.log("[DEBUG] Image upload response: ", res);
        const imgUrl = await handleToUploadImageAndGetURL(file);
        const imagePart = `![${file?.name.replace(
          /\.[^/.]+$/,
          ""
        )}](${imgUrl} "{}")`;
        setCode((prev) => prev + imagePart);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("[ERROR] Occurred while uploading image: ", error);
        toast.error("Failed to upload image");
      }
    },
    [toast, setCode, handleToUploadImageAndGetURL]
  );

  const handleToSetCoverImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      try {
        const imageUrl = await handleToUploadImageAndGetURL(file);
        setCoverImage(imageUrl);
      } catch (error) {
        console.error(`[ERROR] Occurred while setting cover image: ${error}`);
        toast.error("error occurred while setting cover image");
      }
    },
    [toast, coverImage, setCoverImage, handleToUploadImageAndGetURL]
  );

  const handleToDeleteImage = useCallback(async (imageUrl: string) => {
    // TODO: Delete image uring url
  }, []);

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
    if (!contentRef.current) return;

    const el = contentRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    // Selected text
    const selectedText = code.slice(start, end);

    let newCode = code;

    if (selectedText.length > 0) {
      // Wrap selected text
      const link = `[${selectedText}](Link)`;
      newCode = code.slice(0, start) + link + code.slice(end);
    } else {
      // Fallback → last word or empty
      const lastWord = getLastWord();

      if (lastWord.length > 0) {
        const link = `[${lastWord}](Link)`;
        newCode = code.replace(new RegExp(`${lastWord}$`), link);
      } else {
        newCode = code + `[](Link here...)`;
      }
    }

    setCode(newCode);

    // Restore focus
    requestAnimationFrame(() => {
      el.focus();
    });
  }, [code, getLastWord]);

  const handleToPersistContent = useCallback(
    (code: string) => {
      if (contentTO) {
        clearTimeout(contentTO);
      }
      const to = setTimeout(() => {
        setWithExpiry(localBlogId, code, 1000 * 60 * 60 * 72);
      }, 5000);
      setContentTO(to);
    },
    [code, contentTO, localBlogId, setContentTO, setWithExpiry]
  );

  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!coverImage) newErrors.coverImage = "CoverImage is required";
    if (!slug.trim()) newErrors.slug = "Slug is required";
    if (!publishedAt) newErrors.publishedAt = "Publish date is required";
    if (!summary.trim()) newErrors.summary = "Summary is required";
    if (!code.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, slug, coverImage, publishedAt, summary, code, status]);

  const handlePublish = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsLoading(true);

      let blogData: BlogType & { _id?: string } = {
        title,
        coverImage: coverImage!,
        slug,
        publishedAt: new Date(publishedAt),
        summary,
        content: code,
        status,
      };

      if (blog) {
        for (const key in blog) {
          if (((blog as any)[key] as string) == (blogData as any)[key]) {
            delete (blogData as any)[key];
          }
        }
        blogData._id = blog._id;
      }

      // console.log("[DEBUG] Blog data to publish: ", blogData);
      const responseStatus = blog ? "updated" : "created";

      try {
        const res = await httpAxios.post("/blog", blogData);
        setBlog(res.data.data.blog);
        console.log("[DEBUG] Resposne is here: ", res);
        toast.success(`Blog ${responseStatus} successfully!`);
      } catch (error) {
        console.error(`[ERROR] Occurred while publishing blog: ${error}`);
        toast.error(`Failed to ${responseStatus} blog`);
      } finally {
        setIsLoading(false);
      }
    },
    [
      title,
      slug,
      publishedAt,
      summary,
      code,
      blog,
      status,
      coverImage,
      validateForm,
    ]
  );

  const handleToCheckSlugAvailability = useCallback(
    async (finalSlug: string) => {
      try {
        const res = await httpAxios.get(
          `/blog/${finalSlug}/check?blogId=${blog?._id}`
        );
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
    },
    [blog]
  );

  const handleSlugCheck = useCallback(
    async (value: string) => {
      if (isCustomSlug) {
        setSlug(value);
        if (to) {
          clearTimeout(to);
        }

        const currTO = setTimeout(async () => {
          await handleToCheckSlugAvailability(value);
        }, 500);

        setTO(currTO);
      } else {
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
          // console.log(`[DEBUG] Final Slug: ${finalSlug}`);

          setSlug(finalSlug);

          await handleToCheckSlugAvailability(finalSlug);
        }, 500);

        setTO(currTO);
      }
    },
    [isCustomSlug, blog, to, setTO]
  );

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      handleSlugCheck(e.target.value);
    },
    [isCustomSlug, setTitle, handleSlugCheck]
  );

  const handleToDeletePersistedBlogContent = useCallback(() => {
    removeWithKey(localBlogId);
    fetchBlog();
  }, [localBlogId, removeWithKey]);

  const fetchBlog = useCallback(async () => {
    try {
      const res = await httpAxios.get(`/blog/${blogId}`);
      // console.log("[DEBUG] Fetched blog: ", res.data.data.blog);
      const fetchedBlog: BlogType = res.data.data.blog;
      setBlog(fetchedBlog);
      setCoverImage(fetchedBlog.coverImage);
      setTitle(fetchedBlog.title);
      setSlug(fetchedBlog.slug);
      setPublishedAt(
        new Date(fetchedBlog.publishedAt).toISOString().split("T")[0]
      );
      setSummary(fetchedBlog.summary);
      setStatus(fetchedBlog.status);

      const content = getWithExpiry(localBlogId);
      // console.log("CONTENT: ", content);
      setCode(content ?? fetchedBlog.content);
    } catch (error) {
      console.error("[ERROR] Occurred while fetching blog: ", error);
    }
  }, [blogId, localBlogId]);

  useEffect(() => {
    if (!blogId) return;
    fetchBlog();
  }, [blogId, localBlogId, fetchBlog]);

  return (
    <div className="flex justify-center gap-4 py-12">
      <div className="w-full">
        <form onSubmit={handlePublish} className="space-y-4">
          {/* Metadata */}
          <div className="space-y-4 max-w-2xl mx-auto">
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
                <Button
                  onClick={() => setIsCustomSlug((prev) => !prev)}
                  className="w-fit"
                  type="button"
                >
                  {isCustomSlug ? "Custom Slug" : "Auto Generated Slug"}
                </Button>
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="title">Cover Image</Label>
                <div>
                  <Input
                    type="file"
                    id="coverImage"
                    onChange={(e) => handleToSetCoverImage(e)}
                    className={`${errors.title ? "border-red-600" : ""}`}
                    disabled={isLoading}
                  />
                  {errors.coverImage && (
                    <span className="text-red-600 text-xs pl-1">
                      {errors.coverImage}
                    </span>
                  )}

                  {coverImage ? (
                    <div className="relative w-[20%] h-auto ">
                      <Image
                        src={coverImage}
                        alt="Cover Image"
                        width={1080}
                        height={1080}
                      />
                      <button
                        onClick={() => handleToDeleteImage(coverImage)}
                        className="absolute top-2 right-2 rounded-full bg-black text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
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
                    className={`${errors.publishedAt ? "border-red-600" : ""}`}
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
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="summary">Status</Label>
                <div>
                  <Select
                    onValueChange={(val: BlogStatusType) => setStatus(val)}
                    value={status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="draft" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_STATUS.map((st) => (
                        <SelectItem key={st} value={st}>
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.summary && (
                    <span className="text-red-600 text-xs pl-1">
                      {errors.summary}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="flex justify-center gap-4 h-[90vh] overflow-hidden">
            {/* Source */}
            <div
              className={`${isPreviewHide ? "max-w-5xl" : "max-w-2xl"} w-full`}
            >
              <div className="sticky top-0">
                <div className="flex justify-between items-center">
                  <TypographyH2 text="Content" />

                  {isPreviewHide ? (
                    <Button
                      className="mb-2"
                      onClick={() => setIsPreviewHide((prev) => !prev)}
                      type="button"
                    >
                      {isPreviewHide ? "Show Preview" : "Hide Preview"}
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
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
                        onChange={(e) => {
                          setCode(e.target.value);
                          handleToPersistContent(e.target.value);
                        }}
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
                          onClick={() =>
                            imgRef.current && imgRef.current.click()
                          }
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
                          <ImageIcon className="h-4 w-4" />
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
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isLoading}
                          onClick={() => handleToDeletePersistedBlogContent()}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <TimerReset className="h-4 w-4" />
                          )}
                        </button>
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
            </div>

            {/* Preview */}
            {isPreviewHide ? (
              ""
            ) : (
              <Suspense
                fallback={<div className="max-w-2xl w-full">Loading...</div>}
              >
                <div className="max-w-2xl w-full py-6 overflow-y-auto">
                  <Button
                    className="mb-2"
                    onClick={() => setIsPreviewHide((prev) => !prev)}
                    type="button"
                  >
                    {isPreviewHide ? "Show Preview" : "Hide Preview"}
                  </Button>
                  <BlogContent
                    content={code}
                    title={blog?.title || ""}
                    coverImage={coverImage || ""}
                  />
                </div>
              </Suspense>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogWriter;
