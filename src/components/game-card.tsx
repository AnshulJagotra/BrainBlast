import Link from "next/link";
import type { Game } from "@/lib/games";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  const { title, description, slug, Icon } = game;
  return (
    <Link href={`/games/${slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 border-2 border-border/50 group-hover:border-primary group-hover:card-glow bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center text-center p-8">
          <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-10 w-10" />
          </div>
          <CardTitle className="mb-2 font-headline text-2xl text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
