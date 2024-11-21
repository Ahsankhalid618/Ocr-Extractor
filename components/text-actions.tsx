"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download} from "lucide-react";
import { jsPDF } from "jspdf";
import { TextToSpeech } from "./text-to-speech";

interface MarkdownActionsProps {
  markdown: string;
}

export function MarkdownActions({ markdown }: MarkdownActionsProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(markdown, 10, 10);
    doc.save("extracted-text.pdf");
  };


  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <TextToSpeech 
        text={markdown}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
      />
      
      <Button variant="outline" onClick={handleDownloadPDF}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      
    </div>
  );
}