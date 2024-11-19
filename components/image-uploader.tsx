"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "../hooks/use-toast"
import { MarkdownActions } from "@/components/text-actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ImageUploader() {
  const [extractedText, setExtractedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setIsLoading(true);
      const file = acceptedFiles[0];
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    },
    maxFiles: 1,
  });

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
      <Card
        {...getRootProps()}
        className={`p-8 text-center cursor-pointer border-dashed hover:border-primary/50 transition-colors ${
          isDragActive ? "border-primary" : ""
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          Drag & drop an image here, or click to select
        </p>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Processing image...</p>
        </div>
      )}

      {extractedText && !isLoading && (
        <div className="space-y-4">
          <Card className="p-4 relative group">
            <div className="absolute right-2 top-2">
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
            <p className="whitespace-pre-wrap">{extractedText}</p>
          </Card>
          <MarkdownActions markdown={extractedText} />
        </div>
      )}
    </div>
  );
}
