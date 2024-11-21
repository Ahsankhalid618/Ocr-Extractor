import { NextRequest, NextResponse } from "next/server";
import { ocr } from 'llama-ocr';
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

// Ensure tmp directory exists
const ensureTmpDir = async () => {
  // const tmpDir = join(process.cwd(), "tmp"); // For local host
  // await mkdir(tmpDir, { recursive: true }); //  for localhost
  const tmpDir = "/tmp"; // For serverless production like vercel
  return tmpDir;
};

export async function POST(request: NextRequest) {
  try {
    const tmpDir = await ensureTmpDir();
    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file temporarily
    const tempPath = join(tmpDir, file.name);
    await writeFile(tempPath, buffer);

    // Perform OCR using llama-ocr
    const markdown = await ocr({
      filePath: tempPath,
      apiKey: process.env.TOGETHER_API_KEY
    });

    // Format the markdown with proper MDX syntax
    const formattedMarkdown = markdown
      .replace(/^/gm, '') // Remove any leading spaces
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .replace(/```(\w+)?/g, '```$1\n') // Ensure code blocks have proper spacing
      .trim();

    return NextResponse.json({ markdown: formattedMarkdown });
  } catch (error) {
    console.error("OCR processing error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}