import { useState, useEffect } from "react";

interface UseTypingEffectProps {
  text: string;
  speed?: number;
  enabled: boolean;
  onComplete?: () => void;
}

export const useTypingEffect = ({ text, speed = 15, enabled, onComplete }: UseTypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, enabled, onComplete]);

  return { displayedText, isTyping };
};
