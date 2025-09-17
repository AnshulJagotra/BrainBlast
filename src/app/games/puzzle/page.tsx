import { TicTacToeGame } from "@/components/tic-tac-toe-game";

export default function PuzzlePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Tic Tac Toe
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get three in a row to win the game.
        </p>
        <div className="mt-8 w-full flex flex-col items-center">
          <TicTacToeGame />
        </div>
      </div>
    </div>
  );
}
