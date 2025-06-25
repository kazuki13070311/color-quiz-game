'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GameOverDialogProps {
  isOpen: boolean;
  score: number;
  onRestart: () => void;
}

export default function GameOverDialog({ isOpen, score, onRestart }: GameOverDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Game Over!</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Your final score is:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 text-center">
          <p className="text-6xl font-bold">{score}</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onRestart} className="w-full">
            Try Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
