'use client';

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-card p-3 rounded-lg shadow-md">
      <p className="text-xl font-bold">Score: <span className="font-mono">{score}</span></p>
    </div>
  );
}
