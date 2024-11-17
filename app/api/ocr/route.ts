import { NextRequest, NextResponse } from "next/server";
import { ocr } from 'llama-ocr';
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// Ensure tmp directory exists
const ensureTmpDir = async () => {
  const tmpDir = join(process.cwd(), "tmp");
  await mkdir(tmpDir, { recursive: true });
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

    return NextResponse.json({ markdown });
  } catch (error) {
    console.error("OCR processing error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}