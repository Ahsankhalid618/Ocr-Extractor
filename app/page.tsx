import { ImageUploader } from '@/components/image-uploader';
import { ModeToggle } from '@/components/mode-toggle';
import { ScanText } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <ScanText className="h-6 w-6" />
            <span className="text-lg font-bold">OCR Text Extractor</span>
          </div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </nav>
      
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Extract Text from Images
            </h1>
            <p className="mt-4 text-muted-foreground">
              Upload an image and we&apos;ll extract the text for you. You can then
              convert it to speech, download as PDF, or export to Google Docs.
            </p>
          </div>
          
          <ImageUploader />
        </div>
      </div>
    </main>
  );
}