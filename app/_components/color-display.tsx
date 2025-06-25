'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorDisplayProps {
  color: string;
  showRgbValue: boolean;
}

export default function ColorDisplay({ color, showRgbValue }: ColorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="shadow-2xl bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold tracking-wider">この色は何でしょう？</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full h-64 rounded-lg border-2 border-white/10 shadow-inner"
            style={{ backgroundColor: color }}
          />
          <div className="mt-6 text-center h-10 flex items-center justify-center">
            <p className="text-3xl font-mono font-bold tracking-widest transition-opacity duration-300">
              {showRgbValue ? color : "???"}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}