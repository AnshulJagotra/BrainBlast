import { ConnectFourGame } from "@/components/connect-four-game";

export default function ConnectDotPage() {
  return (
    <div className="container py-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-primary">
          Connect Four
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Be the first to connect four of your checkers in a row to win!
        </p>
        <div className="mt-8">
            <ConnectFourGame />
        </div>
      </div>
    </div>
  );
}
