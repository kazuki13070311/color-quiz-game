'use client';

import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-card p-3 rounded-lg shadow-md">
      <p className="text-xl font-bold">Score: 
        <span key={score} className="font-mono inline-block animate-score-up">{score}</span>
      </p>
    </div>
  );
}