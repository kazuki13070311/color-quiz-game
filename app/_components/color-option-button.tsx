'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorOptionButtonProps {
  color: string;
  onClick: (color: string) => void;
  disabled: boolean;
  // The following props will be used in a later phase for feedback
  // isCorrect: boolean;
  // isSelected: boolean;
  // showFeedback: boolean;
}

export default function ColorOptionButton({ color, onClick, disabled }: ColorOptionButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full h-20 text-lg font-mono font-semibold tracking-wider"
      onClick={() => onClick(color)}
      disabled={disabled}
    >
      {color}
    </Button>
  );
}
