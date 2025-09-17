import { SudokuBoard } from "@/components/sudoku-board";

export default function SudokuPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Sudoku
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fill the grid so that every row, column, and 3x3 box contains the digits 1 through 9.
        </p>
        <div className="mt-8 w-full">
          <SudokuBoard />
        </div>
      </div>
    </div>
  );
}
