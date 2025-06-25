import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorDisplayProps {
  color: string;
  showRgbValue: boolean;
}

export default function ColorDisplay({ color, showRgbValue }: ColorDisplayProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Guess the Color</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="w-full h-64 rounded-lg border shadow-lg transition-colors duration-500"
          style={{ backgroundColor: color }}
        />
        <div className="mt-4 text-center">
          <p className="text-2xl font-mono font-semibold tracking-widest transition-opacity duration-300">
            {showRgbValue ? color : "???"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
