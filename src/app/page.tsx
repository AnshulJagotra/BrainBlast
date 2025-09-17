import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GamesPage() {
  const featuredGame = games[0];

  return (
    <div className="container py-12 md:py-20">
      <section className="text-center mb-16 md:mb-24 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-glow">
          Welcome to BrainBlast
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Challenge yourself with our collection of fun and engaging games designed to sharpen your mind.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight mb-8 text-center md:text-left">
          All Games
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <div
              key={game.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
