"use client";
import { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Trash2, Loader2, Plus, AlertCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { httpAxios } from "@/config/axios";

interface UploadedImagesManagerProps {
  onImageUrlCopied?: (url: string) => void;
  mdxCode?: string;
}

export interface UploadedImagesManagerRef {
  addImage: (url: string) => void;
}

const UploadedImagesManager = forwardRef<
  UploadedImagesManagerRef,
  UploadedImagesManagerProps
>(({ onImageUrlCopied, mdxCode = "" }, ref) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [mdxImages, setMdxImages] = useState<string[]>([]);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  // Extract all image URLs from MDX code
  const extractImagesFromMDX = useCallback((code: string): string[] => {
    const imageRegex = /!\[.*?\]\((.*?)\s+"/g;
    const urls: string[] = [];
    let match;

    while ((match = imageRegex.exec(code)) !== null) {
      const url = match[1];
      if (url && !urls.includes(url)) {
        urls.push(url);
      }
    }

    return urls;
  }, []);

  // Sync with MDX content
  useEffect(() => {
    const imagesInMDX = extractImagesFromMDX(mdxCode);
    setMdxImages(imagesInMDX);

    // Update uploadedImages to reflect what's in MDX
    setUploadedImages((prev) => {
      // Keep images that are in MDX or were manually added
      const filtered = prev.filter(
        (url) =>
          imagesInMDX.includes(url) ||
          (url && !url.startsWith("data:") && url.trim() !== "")
      );

      // Add new images from MDX
      const newImages = imagesInMDX.filter((url) => !prev.includes(url));
      if (newImages.length > 0) {
        return [...filtered, ...newImages];
      }

      return filtered;
    });
  }, [mdxCode, extractImagesFromMDX]);

  // Expose addImage method to parent components
  useImperativeHandle(ref, () => ({
    addImage: (url: string) => {
      if (!url.trim()) {
        toast.error("Invalid image URL");
        return;
      }

      if (uploadedImages.includes(url)) {
        toast.warning("This image URL already exists");
        return;
      }

      setUploadedImages((prev) => [...prev, url]);
      toast.success("Image added to gallery");
    },
  }), [uploadedImages]);

  const handleAddImage = useCallback(() => {
    if (!imageUrl.trim()) {
      toast.error("Please enter a valid image URL");
      return;
    }

    if (uploadedImages.includes(imageUrl)) {
      toast.warning("This image URL already exists");
      return;
    }

    setUploadedImages((prev) => [...prev, imageUrl]);
    toast.success("Image URL added to gallery");
    setImageUrl("");
  }, [imageUrl, uploadedImages]);

  const handleDeleteImage = useCallback(
    async (url: string) => {
      setDeletingUrl(url);
      try {
        // Extract the key from URL for deletion
        const urlObj = new URL(url);
        const key = urlObj.pathname.split("/").slice(-2).join("/");

        await httpAxios.delete("/blog/image/delete", {
          data: { key },
        });

        setUploadedImages((prev) => prev.filter((img) => img !== url));
        toast.success("Image deleted successfully");
      } catch (error) {
        console.error("[ERROR] Failed to delete image:", error);
        toast.error("Failed to delete image");
      } finally {
        setDeletingUrl(null);
      }
    },
    []
  );

  const handleCopyUrl = useCallback(
    (url: string) => {
      navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
      onImageUrlCopied?.(url);
    },
    [onImageUrlCopied]
  );

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="font-bold text-sm">Manage Uploaded Images</h3>

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-xs">
          Image URL
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL here..."
            className="text-sm"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddImage();
              }
            }}
          />
          <Button
            onClick={handleAddImage}
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap"
            disabled={!imageUrl.trim()}
          >
            <Plus className="w-3 h-3" />
            Add
          </Button>
        </div>
      </div>

      {/* Uploaded Images Gallery */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {uploadedImages.length} image{uploadedImages.length === 1 ? "" : "s"}
              {mdxImages.length > 0 && (
                <span className="ml-2 text-green-600">
                  ({mdxImages.length} used in article)
                </span>
              )}
            </p>
          </div>

          {/* Images used in MDX */}
          {mdxImages.length > 0 && (
            <div className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950/20 rounded p-2 flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
              <span>Images with green border are used in your article</span>
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uploadedImages.map((url) => {
              const isUsedInMDX = mdxImages.includes(url);
              return (
                <div
                  key={url}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${
                    isUsedInMDX
                      ? "border-2 border-green-500 bg-green-50/30 dark:bg-green-950/20 hover:bg-green-50/50 dark:hover:bg-green-950/30"
                      : "border hover:bg-muted/50"
                  }`}
                >
                  {/* Image Preview */}
                  <div className="relative w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src={url}
                      alt="Uploaded"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Status Badge */}
                  {isUsedInMDX && (
                    <div className="hidden sm:block bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                      In Use
                    </div>
                  )}

                  {/* URL Text */}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={url}
                      readOnly
                      className="text-xs bg-transparent text-muted-foreground truncate w-full focus:outline-none cursor-pointer"
                      onClick={() => handleCopyUrl(url)}
                      title="Click to copy"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => handleCopyUrl(url)}
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy URL"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteImage(url)}
                      variant="ghost"
                      size="sm"
                      className={`h-7 w-7 p-0 ${
                        isUsedInMDX
                          ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 cursor-not-allowed opacity-50"
                          : "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      }`}
                      disabled={deletingUrl === url || isUsedInMDX}
                      title={isUsedInMDX ? "Remove from article first" : "Delete image"}
                    >
                      {deletingUrl === url ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {uploadedImages.length === 0 && imageUrl === "" && (
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            No images uploaded yet
          </p>
        </div>
      )}
    </div>
  );
});

UploadedImagesManager.displayName = "UploadedImagesManager";

export default UploadedImagesManager;
