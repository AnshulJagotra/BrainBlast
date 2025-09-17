import { FallingObjectsCatcherGame } from "@/components/falling-objects-catcher-game";

export default function FallingObjectsCatcherPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Fruit Catcher
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use arrow keys or drag to move the basket. Catch the fruits, avoid the rocks!
        </p>
        <div className="mt-8 w-full flex flex-col items-center">
          <FallingObjectsCatcherGame />
        </div>
      </div>
    </div>
  );
}
