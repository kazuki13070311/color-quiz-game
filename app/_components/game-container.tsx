'use client';

import { useState } from 'react';
import ColorDisplay from "./color-display";
import ColorOptionsGrid from "./color-options-grid";
import GameOverDialog from "./game-over-dialog";
import ScoreDisplay from "./score-display";

// Dummy data for initial static layout
const DUMMY_COLOR = "rgb(100, 150, 200)";
const DUMMY_OPTIONS = [
  "rgb(100, 150, 200)",
  "rgb(255, 0, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 0, 255)",
];

export default function GameContainer() {
  // In the next phase, these will be replaced with actual game state and logic.
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center">
      <ScoreDisplay score={score} />
      <ColorDisplay color={DUMMY_COLOR} showRgbValue={false} />
      <ColorOptionsGrid 
        options={DUMMY_OPTIONS} 
        onSelectOption={() => {}}
        disabled={false}
      />
      <GameOverDialog 
        isOpen={isGameOver}
        score={score}
        onRestart={() => setIsGameOver(false)}
      />
    </div>
  );
}
