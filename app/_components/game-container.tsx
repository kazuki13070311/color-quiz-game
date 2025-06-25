'use client';

import { useState, useEffect, useCallback } from 'react';
import ColorDisplay from "./color-display";
import ColorOptionsGrid from "./color-options-grid";
import GameOverDialog from "./game-over-dialog";
import ScoreDisplay from "./score-display";
import { generateRandomColor, generateOptions } from "@/lib/colorUtils";

type GameState = 'playing' | 'answered' | 'gameOver';

export default function GameContainer() {
  const [correctColor, setCorrectColor] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [userChoice, setUserChoice] = useState<{ color: string; isCorrect: boolean } | null>(null);

  const startNewRound = useCallback(() => {
    const newCorrectColor = generateRandomColor();
    setCorrectColor(newCorrectColor);
    setOptions(generateOptions(newCorrectColor));
    setGameState('playing');
    setUserChoice(null);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleSelectOption = (selectedColor: string) => {
    if (gameState !== 'playing') return;

    const isCorrect = selectedColor === correctColor;
    setUserChoice({ color: selectedColor, isCorrect });

    if (isCorrect) {
      setScore(prev => prev + 1);
      setGameState('answered');
    } else {
      setGameState('gameOver');
    }
  };

  const handleRestart = () => {
    setScore(0);
    startNewRound();
  };

  useEffect(() => {
    if (gameState === 'answered' && userChoice?.isCorrect) {
      const timer = setTimeout(() => {
        startNewRound();
      }, 1200); // A bit longer to appreciate the green button
      return () => clearTimeout(timer);
    }
  }, [gameState, userChoice, startNewRound]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <ScoreDisplay score={score} />
      <ColorDisplay 
        color={correctColor} 
        showRgbValue={gameState !== 'playing'}
      />
      <ColorOptionsGrid 
        options={options} 
        onSelectOption={handleSelectOption}
        disabled={gameState !== 'playing'}
        feedback={gameState !== 'playing' ? { correctColor, userChoice } : null}
      />
      <GameOverDialog 
        isOpen={gameState === 'gameOver'}
        score={score}
        onRestart={handleRestart}
      />
    </div>
  );
}
