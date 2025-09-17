import { WordokuBoard } from "@/components/wordoku-board";

export default function WordokuPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Wordoku
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fill the grid so that every row, column, and 3x3 box contains each letter of the word exactly once.
        </p>
        <div className="mt-8 w-full">
          <WordokuBoard />
        </div>
      </div>
    </div>
  );
}
