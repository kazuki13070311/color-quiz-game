import GameContainer from "@/app/_components/game-container";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <GameContainer />
    </main>
  );
}