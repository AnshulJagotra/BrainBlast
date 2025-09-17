import type { LucideIcon } from "lucide-react";
import { Shapes, Brain, Hash, SpellCheck, Bird, ShoppingBasket } from "lucide-react";

export type Game = {
  title: string;
  slug: string;
  description: string;
  Icon: LucideIcon;
};

export const games: Game[] = [
  {
    title: "Connect Four",
    slug: "connect-dot",
    description: "Drop your checkers and be the first to get four in a row!",
    Icon: Shapes,
  },
  {
    title: "Sudoku",
    slug: "sudoku",
    description: "A classic logic-based number-placement puzzle.",
    Icon: Brain,
  },
  {
    title: "Wordoku",
    slug: "wordoku",
    description: "A variation of Sudoku that uses letters instead of numbers.",
    Icon: SpellCheck,
  },
  {
    title: "Tic Tac Toe",
    slug: "puzzle",
    description: "A classic game of X's and O's. Get three in a row to win.",
    Icon: Hash,
  },
  {
    title: "Flappy Bird",
    slug: "flappy-bird",
    description: "Navigate the bird through pipes. Don't crash!",
    Icon: Bird,
  },
  {
    title: "Fruit Catcher",
    slug: "falling-objects-catcher",
    description: "Catch the falling fruits and avoid the rocks.",
    Icon: ShoppingBasket,
  },
];
