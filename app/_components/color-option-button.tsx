'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorOptionButtonProps {
  color: string;
  onClick: (color: string) => void;
  disabled: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  showFeedback: boolean;
}

export default function ColorOptionButton({ 
  color, 
  onClick, 
  disabled, 
  isCorrect, 
  isSelected, 
  showFeedback 
}: ColorOptionButtonProps) {
  
  const getVariant = () => {
    if (!showFeedback) return "outline";
    if (isCorrect) return "default"; // Will be styled to be green
    if (isSelected && !isCorrect) return "destructive";
    return "outline";
  }

  return (
    <Button
      variant={getVariant()}
      size="lg"
      className={cn(
        "w-full h-20 text-lg font-mono font-semibold tracking-wider transition-all duration-300",
        {
          "bg-green-500 hover:bg-green-600 text-white": showFeedback && isCorrect,
          "opacity-50": showFeedback && !isCorrect && !isSelected
        }
      )}
      onClick={() => onClick(color)}
      disabled={disabled}
    >
      {color}
    </Button>
  );
}