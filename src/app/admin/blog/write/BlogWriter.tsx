"use client";
import { TypographyH2 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogType } from "@/types/app/blog";
import { ArrowUp, ImageIcon, Link, Loader2, TimerReset, X, Eye, EyeOff, ArrowLeft, Check, Code } from "lucide-react";
import {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { BlogContent } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { getWithExpiry, removeWithKey, setWithExpiry, saveDraftArticle, loadDraftArticle, removeDraftArticle, hasExistingDraft, type ArticleDraft } from "@/lib/utils";
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
import BlurFade from "@/components/magicui/blur-fade";
import { BlogStatusBadge } from "@/components/admin";
import UploadedImagesManager, {
  type UploadedImagesManagerRef,
} from "@/components/admin/UploadedImagesManager";

const BlogWriter = () => {
  const [code, setCode] = useState<string>("");
  const [to, setTO] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isSlugExist, setIsSlugExist] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<(BlogType & { _id?: string }) | null>(null);
  const [isPreviewHide, setIsPreviewHide] = useState<boolean>(true);
  const [isCustomSlug, setIsCustomSlug] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [previewWidth, setPreviewWidth] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const searchParams = useSearchParams();
  const router = useRouter();
  const blogId = searchParams.get("blogId");

  // Preview width mappings
  const previewWidthMap = {
    mobile: "max-w-sm",
    tablet: "max-w-2xl",
    desktop: "max-w-4xl",
  };

  // Form states
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [summary, setSummary] = useState<string>("");
  const [status, setStatus] = useState<BlogStatusType>("draft");

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imagesManagerRef = useRef<UploadedImagesManagerRef>(null);

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
        const imgUrl = await handleToUploadImageAndGetURL(file);
        const imagePart = `![${file?.name.replace(
          /\.[^\/\.]+$/,
          ""
        )}](${imgUrl} "{}")`;
        setCode((prev) => prev + imagePart);
        setHasUnsavedChanges(true);
        
        // Add to Images Manager
        imagesManagerRef.current?.addImage(imgUrl);
        
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

  const handleOnCodeBlock = useCallback(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    // Selected text
    const selectedCode = code.slice(start, end);

    let newCode = code;
    const codeBlockTemplate = `\n\`\`\`language-filename=index.ts highlightLines=[]\n-code-\n${selectedCode || "// Your code here"}
\`\`\`\n`;

    if (selectedCode.length > 0) {
      // Replace selected text with code block
      newCode = code.slice(0, start) + codeBlockTemplate + code.slice(end);
    } else {
      // Add code block at end
      newCode = code + codeBlockTemplate;
    }

    setCode(newCode);
    setHasUnsavedChanges(true);

    // Restore focus
    requestAnimationFrame(() => {
      el.focus();
    });
  }, [code]);

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
        
        // Remove draft from local storage on successful save
        removeDraftArticle(blogId);
        setHasUnsavedChanges(false);
        
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
      blogId,
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

  const fetchBlog = useCallback(async () => {
    try {
      // Try to load from draft first
      const draft = loadDraftArticle(blogId);
      
      if (draft) {
        console.log("[DEBUG] Loading from draft:", draft);
        // Load from draft
        setTitle(draft.title);
        setSlug(draft.slug);
        setPublishedAt(draft.publishedAt);
        setSummary(draft.summary);
        setStatus(draft.status as BlogStatusType);
        setCoverImage(draft.coverImage);
        setCode(draft.content);
        setHasUnsavedChanges(false);
        toast.info("Loaded from draft - changes not saved to server yet");
        return;
      }

      // Fetch from server
      const res = await httpAxios.get(`/blog/${blogId}`);
      console.log("[DEBUG] Fetched blog from server:", res.data.data.blog);
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
      setCode(fetchedBlog.content);

      // Auto-save as draft for server-loaded articles
      const draftData: ArticleDraft = {
        title: fetchedBlog.title,
        slug: fetchedBlog.slug,
        publishedAt: new Date(fetchedBlog.publishedAt).toISOString().split("T")[0],
        summary: fetchedBlog.summary,
        status: fetchedBlog.status,
        coverImage: fetchedBlog.coverImage,
        content: fetchedBlog.content,
        updatedAt: Date.now(),
      };
      saveDraftArticle(blogId, draftData);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("[ERROR] Occurred while fetching blog: ", error);
      toast.error("Failed to load article");
    }
  }, [blogId]);

  const handleToDeletePersistedBlogContent = useCallback(() => {
    // Remove draft
    removeDraftArticle(blogId);
    // Reload from server
    fetchBlog();
  }, [blogId, fetchBlog]);

  useEffect(() => {
    if (blogId) {
      // Editing existing article
      fetchBlog();
    } else {
      // New article - check for existing draft
      const existingDraft = loadDraftArticle(null);
      if (existingDraft) {
        console.log("[DEBUG] Loading existing new article draft");
        setTitle(existingDraft.title);
        setSlug(existingDraft.slug);
        setPublishedAt(existingDraft.publishedAt);
        setSummary(existingDraft.summary);
        setStatus(existingDraft.status as BlogStatusType);
        setCoverImage(existingDraft.coverImage);
        setCode(existingDraft.content);
        setHasUnsavedChanges(false);
        toast.info("Loaded last draft of new article");
      }
    }
  }, [blogId, fetchBlog]);

  // Auto-save draft on content changes (debounced)
  useEffect(() => {
    if (!title.trim() && !code.trim()) {
      // Don't save empty articles
      return;
    }

    const saveTimer = setTimeout(() => {
      const draftData: ArticleDraft = {
        title,
        slug,
        publishedAt,
        summary,
        status,
        coverImage: coverImage || "",
        content: code,
        updatedAt: Date.now(),
      };
      saveDraftArticle(blogId, draftData);
      console.log("[DEBUG] Auto-saved draft for", blogId ? `article ${blogId}` : "new article");
    }, 3000); // Save after 3 seconds of inactivity

    return () => clearTimeout(saveTimer);
  }, [title, slug, publishedAt, summary, status, coverImage, code, blogId]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BlurFade delay={0.1} className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-bold text-xl">{blog ? "Edit Article" : "Write Article"}</h1>
              {blog && (
                <div className="flex items-center gap-2 mt-1">
                  <BlogStatusBadge status={status} />
                  {hasUnsavedChanges && (
                    <span className="text-xs text-amber-600">Unsaved changes</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={(e) => {
              handlePublish(e as any);
              setHasUnsavedChanges(false);
            }}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save Article
              </>
            )}
          </Button>
        </div>
      </BlurFade>

      <form onSubmit={handlePublish} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metadata Section */}
            <BlurFade delay={0.2}>
              <div className="border rounded-lg p-6 space-y-4">
                <h2 className="font-bold text-lg">Article Details</h2>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    type="text"
                    autoFocus
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter article title..."
                    className={`${errors.title ? "border-red-600 bg-red-50 dark:bg-red-950/20" : ""}`}
                    disabled={isLoading}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-xs">{errors.title}</p>
                  )}
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug" className="text-sm font-medium">
                      Slug
                    </Label>
                    <Button
                      onClick={() => setIsCustomSlug((prev) => !prev)}
                      variant="outline"
                      size="sm"
                      type="button"
                    >
                      {isCustomSlug ? "Custom" : "Auto"}
                    </Button>
                  </div>
                  <Input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => {
                      handleSlugCheck(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="article-slug"
                    className={`font-mono text-sm ${errors.slug ? "border-red-600 bg-red-50 dark:bg-red-950/20" : ""}`}
                    disabled={isLoading}
                  />
                  <div className="flex items-center gap-2">
                    {errors.slug ? (
                      <p className="text-red-600 text-xs">{errors.slug}</p>
                    ) : isSlugExist !== null ? (
                      isSlugExist ? (
                        <div className="flex items-center gap-1 text-green-600 text-xs">
                          <Check className="w-3 h-3" />
                          Available
                        </div>
                      ) : (
                        <p className="text-red-600 text-xs">Not available</p>
                      )
                    ) : (
                      <p className="text-muted-foreground text-xs">Checking...</p>
                    )}
                  </div>
                </div>

                {/* Publish Date */}
                <div className="space-y-2">
                  <Label htmlFor="publishedAt" className="text-sm font-medium">
                    Publish Date
                  </Label>
                  <Input
                    type="date"
                    id="publishedAt"
                    value={publishedAt}
                    onChange={(e) => {
                      setPublishedAt(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className={errors.publishedAt ? "border-red-600 bg-red-50 dark:bg-red-950/20" : ""}
                    disabled={isLoading}
                  />
                  {errors.publishedAt && (
                    <p className="text-red-600 text-xs">{errors.publishedAt}</p>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-sm font-medium">
                    Summary
                  </Label>
                  <Textarea
                    id="summary"
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Brief description of your article..."
                    rows={3}
                    className={`resize-none ${errors.summary ? "border-red-600 bg-red-50 dark:bg-red-950/20" : ""}`}
                    disabled={isLoading}
                  />
                  <div className="text-xs text-muted-foreground">
                    {summary.length}/160 characters
                  </div>
                  {errors.summary && (
                    <p className="text-red-600 text-xs">{errors.summary}</p>
                  )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select
                    onValueChange={(val: BlogStatusType) => {
                      setStatus(val);
                      setHasUnsavedChanges(true);
                    }}
                    value={status}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_STATUS.map((st) => (
                        <SelectItem key={st} value={st}>
                          <div className="flex items-center gap-2 capitalize">
                            {st}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </BlurFade>

            {/* Editor Section */}
            <BlurFade delay={0.3}>
              <div className="border rounded-lg overflow-hidden flex flex-col h-[500px]">
                <div className="flex items-center justify-between p-4 border-b bg-muted/50">
                  <h3 className="font-bold text-sm">Content (MDX)</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setIsPreviewHide((prev) => !prev)}
                      variant="outline"
                      size="sm"
                      type="button"
                      className="flex items-center gap-2"
                    >
                      {isPreviewHide ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Show Preview
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Hide Preview
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Textarea */}
                <textarea
                  placeholder="Write your article in MDX format...\n\n# Heading\n\nYour content here..."
                  ref={contentRef}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 font-mono text-sm resize-none"
                />

                {/* Toolbar */}
                <div className="flex items-center justify-between p-3 border-t bg-muted/50">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => imgRef.current?.click()}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                      disabled={isLoading}
                      title="Insert image"
                    >
                      <input
                        ref={imgRef}
                        type="file"
                        onChange={handleOnImageSelect}
                        accept="image/*"
                        className="hidden"
                        disabled={isLoading}
                      />
                      <ImageIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleOnLink}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                      disabled={isLoading}
                      title="Insert link"
                    >
                      <Link className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleOnCodeBlock}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                      disabled={isLoading}
                      title="Insert code block"
                    >
                      <Code className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    disabled={isLoading}
                    onClick={handleToDeletePersistedBlogContent}
                    title="Reset content"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <TimerReset className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.content && (
                <p className="text-red-600 text-xs mt-2">{errors.content}</p>
              )}
            </BlurFade>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Image */}
            <BlurFade delay={0.4}>
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-sm">Cover Image</h3>
                <div className="space-y-3">
                  <Input
                    type="file"
                    id="coverImage"
                    onChange={handleToSetCoverImage}
                    className={errors.coverImage ? "border-red-600" : ""}
                    disabled={isLoading}
                    accept="image/*"
                  />
                  {errors.coverImage && (
                    <p className="text-red-600 text-xs">{errors.coverImage}</p>
                  )}

                  {coverImage && (
                    <div className="relative group">
                      <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={coverImage}
                          alt="Cover Image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setCoverImage(null);
                          handleToDeleteImage(coverImage);
                        }}
                        className="absolute top-2 right-2 rounded-md bg-black/70 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        type="button"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </BlurFade>

            {/* Uploaded Images Manager */}
            <BlurFade delay={0.45}>
              <UploadedImagesManager
                ref={imagesManagerRef}
                mdxCode={code}
                onImageUrlCopied={(url) => {
                  const imagePart = `![uploaded](${url} "{}")`;
                  setCode((prev) => prev + imagePart);
                  setHasUnsavedChanges(true);
                }}
              />
            </BlurFade>
          </div>
        </div>

        {/* Full Width Preview Section */}
        {!isPreviewHide && (
          <BlurFade delay={0.5} className="w-full">
            <div className="border-t mt-6 pt-6 px-6 pb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Preview</h3>
                  <span className="text-sm text-muted-foreground capitalize font-medium">
                    {previewWidth === "mobile" && "📱 Mobile (384px)"}
                    {previewWidth === "tablet" && "📌 Tablet (672px)"}
                    {previewWidth === "desktop" && "🖥️ Desktop (896px)"}
                  </span>
                </div>
                
                {/* Screen Size Buttons */}
                <div className="flex items-center gap-2 border rounded-md p-1 bg-muted/50 w-fit">
                  <button
                    onClick={() => setPreviewWidth("mobile")}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      previewWidth === "mobile"
                        ? "bg-foreground text-background"
                        : "bg-transparent text-foreground hover:bg-muted"
                    }`}
                    type="button"
                  >
                    📱 Mobile
                  </button>
                  <button
                    onClick={() => setPreviewWidth("tablet")}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      previewWidth === "tablet"
                        ? "bg-foreground text-background"
                        : "bg-transparent text-foreground hover:bg-muted"
                    }`}
                    type="button"
                  >
                    📌 Tablet
                  </button>
                  <button
                    onClick={() => setPreviewWidth("desktop")}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      previewWidth === "desktop"
                        ? "bg-foreground text-background"
                        : "bg-transparent text-foreground hover:bg-muted"
                    }`}
                    type="button"
                  >
                    🖥️ Desktop
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <Suspense fallback={<div className="py-8 text-center">Loading preview...</div>}>
                <div className={`flex justify-center py-8 min-h-[500px] ${previewWidth === "mobile" ? "bg-muted/30 rounded-lg" : ""}`}>
                  <div className={`${previewWidthMap[previewWidth]} w-full px-4`}>
                    <div className="bg-background border rounded-lg p-8 space-y-4">
                      <BlogContent
                        content={code}
                        title={title || "Your Article"}
                        coverImage={coverImage || ""}
                      />
                    </div>
                  </div>
                </div>
              </Suspense>
            </div>
          </BlurFade>
        )}
      </form>
    </div>
  );
};

export default BlogWriter;
