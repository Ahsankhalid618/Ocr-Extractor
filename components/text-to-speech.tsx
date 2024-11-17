"use client";

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface TextToSpeechProps {
  text: string;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
}

export function TextToSpeech({ text, isSpeaking, setIsSpeaking }: TextToSpeechProps) {
  const handleTextToSpeech = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      variant="outline"
      onClick={handleTextToSpeech}
      disabled={isSpeaking}
    >
      <Volume2 className="mr-2 h-4 w-4" />
      {isSpeaking ? "Speaking..." : "Text to Speech"}
    </Button>
  );
}