"use client";

import { Button } from "@/components/ui/button";
import { Volume2, Pause, Square } from "lucide-react";
import { useEffect, useRef } from "react";

interface TextToSpeechProps {
  text: string;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
}

export function TextToSpeech({ text, isSpeaking, setIsSpeaking }: TextToSpeechProps) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Create a single utterance instance
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.onend = () => setIsSpeaking(false);
    
    // Cleanup function
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, setIsSpeaking]);

  const handleTextToSpeech = () => {
    if (!text || !utteranceRef.current) return;

    if (isSpeaking) {
      window.speechSynthesis.pause();
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        // Only speak if not already speaking
        if (!window.speechSynthesis.speaking) {
          window.speechSynthesis.speak(utteranceRef.current);
        }
      }
    }
    setIsSpeaking(!isSpeaking);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleTextToSpeech}
      >
        {isSpeaking ? (
          <>
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </>
        ) : (
          <>
            <Volume2 className="mr-2 h-4 w-4" />
            {window.speechSynthesis.paused ? "Resume" : "Text to Speech"}
          </>
        )}
      </Button>
      
      {(isSpeaking || window.speechSynthesis.paused) && (
        <Button
          variant="outline"
          onClick={handleStop}
        >
          <Square className="mr-2 h-4 w-4" />
          Stop
        </Button>
      )}
    </div>
  );
}