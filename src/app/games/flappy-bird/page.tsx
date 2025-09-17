import { FlappyBirdGame } from "@/components/flappy-bird-game";

export default function FlappyBirdPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Flappy Bird
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Press Space or tap to make the bird flap. Navigate through the pipes!
        </p>
        <div className="mt-8 w-full flex flex-col items-center">
          <FlappyBirdGame />
        </div>
      </div>
    </div>
  );
}
