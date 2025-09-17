"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Games" },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "transition-colors hover:text-primary",
          pathname === link.href || (link.href === "/" && pathname.startsWith("/games")) ? "text-primary font-semibold" : "text-muted-foreground",
          isMobile ? "text-lg" : "text-sm font-medium"
        )}
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline text-lg text-glow">
            BrainBlast
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {renderNavLinks()}
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mb-8 flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline text-lg text-glow">BrainBlast</span>
              </Link>
              <nav className="flex flex-col items-start gap-6">
                {renderNavLinks(true)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
