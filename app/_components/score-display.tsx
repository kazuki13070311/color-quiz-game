'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm p-3 px-5 rounded-full shadow-lg">
      <p className="text-xl font-bold text-white">
        スコア: 
        <span className="font-mono ml-2 w-12 inline-block text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={score}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {score}
            </motion.span>
          </AnimatePresence>
        </span>
      </p>
    </div>
  );
}
