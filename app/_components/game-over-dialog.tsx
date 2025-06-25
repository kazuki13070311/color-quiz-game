'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
    <AnimatePresence>
      {isOpen && (
        <AlertDialog open={isOpen}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlertDialogContent asChild>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-3xl text-center">ゲームオーバー</AlertDialogTitle>
                  <AlertDialogDescription className="text-lg text-center pt-2">
                    あなたの最終スコアは...
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="my-6 text-center">
                  <p className="text-7xl font-bold">{score}</p>
                </div>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={onRestart} className="w-full text-lg py-6">
                    もう一度挑戦する
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </AlertDialogContent>
          </motion.div>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
}