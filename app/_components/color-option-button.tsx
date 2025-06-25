'use client';

import { motion } from 'framer-motion';
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
    if (isCorrect) return "default";
    if (isSelected && !isCorrect) return "destructive";
    return "outline";
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={getVariant()}
        size="lg"
        className={cn(
          "w-full h-24 text-xl font-mono font-semibold tracking-wider transition-all duration-300 shadow-lg border-2",
          {
            "bg-green-500 hover:bg-green-600 border-green-400 text-white": showFeedback && isCorrect,
            "opacity-40 scale-95": showFeedback && !isCorrect && !isSelected
          }
        )}
        onClick={() => onClick(color)}
        disabled={disabled}
      >
        {color}
      </Button>
    </motion.div>
  );
}
