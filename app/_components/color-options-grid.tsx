'use client';

import ColorOptionButton from "./color-option-button";

interface ColorOptionsGridProps {
  options: string[];
  onSelectOption: (color: string) => void;
  disabled: boolean;
  feedback: {
    correctColor: string;
    userChoice: { color: string; isCorrect: boolean } | null;
  } | null;
}

export default function ColorOptionsGrid({ options, onSelectOption, disabled, feedback }: ColorOptionsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
      {options.map((color) => (
        <ColorOptionButton
          key={color}
          color={color}
          onClick={onSelectOption}
          disabled={disabled}
          showFeedback={!!feedback}
          isCorrect={color === feedback?.correctColor}
          isSelected={color === feedback?.userChoice?.color}
        />
      ))}
    </div>
  );
}