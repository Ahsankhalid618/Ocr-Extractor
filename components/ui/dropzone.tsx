"use client";

import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
}

export function Dropzone({ onFileAccepted }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    },
    maxFiles: 1,
  });

  return (
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
  );
}