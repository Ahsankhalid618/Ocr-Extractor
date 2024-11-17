"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Volume2, FileText } from "lucide-react";
import { jsPDF } from "jspdf";

interface MarkdownActionsProps {
  markdown: string;
}

export function MarkdownActions({ markdown }: MarkdownActionsProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextToSpeech = () => {
    if (!markdown) return;

    const utterance = new SpeechSynthesisUtterance(markdown);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(markdown, 10, 10);
    doc.save("extracted-text.pdf");
  };

  const handleExportToGoogleDocs = () => {
    const encodedText = encodeURIComponent(markdown);
    window.open(
      `https://docs.google.com/document/create?body=${encodedText}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={handleTextToSpeech}
        disabled={isSpeaking}
      >
        <Volume2 className="mr-2 h-4 w-4" />
        {isSpeaking ? "Speaking..." : "Text to Speech"}
      </Button>
      
      <Button variant="outline" onClick={handleDownloadPDF}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      
      <Button variant="outline" onClick={handleExportToGoogleDocs}>
        <FileText className="mr-2 h-4 w-4" />
        Export to Google Docs
      </Button>
    </div>
  );
}