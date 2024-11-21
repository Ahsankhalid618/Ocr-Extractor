"use client";

import { useCallback, useState } from "react";
import { Upload, Loader2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "../hooks/use-toast"
import { MarkdownActions } from "@/components/text-actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/ui/file-upload";
import { MDXContent } from "@/components/mdx-content";
import Loader from "@/components/loader"


export function ImageUploader() {
  const [extractedText, setExtractedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      setIsLoading(true);
      const file = files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/ocr", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to process image");

        const data = await response.json();
        setExtractedText(data.markdown);
        toast({
          title: "Success!",
          description: "Text has been extracted from your image.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload 
          onChange={handleFileUpload}
          accept={{
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
          }}
          maxFiles={1}
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2">
          <Loader />
          <p>Processing Image</p>
        </div>
      )}

      {extractedText && !isLoading && (
        <div className="space-y-4">
          <Card className="p-8 relative group">
            <div className="absolute right-4 top-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="disabled:opacity-100"
                      onClick={handleCopy}
                      aria-label={copied ? "Copied" : "Copy to clipboard"}
                      disabled={copied}
                    >
                      <div
                        className={cn(
                          "transition-all",
                          copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                      >
                        <Check className="stroke-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div
                        className={cn(
                          "absolute transition-all",
                          copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                        )}
                      >
                        <Copy size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                    Click to copy
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <MDXContent source={extractedText} />
          </Card>
          <MarkdownActions markdown={extractedText} />
        </div>
      )}
    </div>
  );
}
