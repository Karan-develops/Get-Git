import Link from "next/link";
import { GithubIcon, Gitlab, Heart, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-1">
            <GithubIcon className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">Get Git</span>
            <Gitlab className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Karan-develops/Get-Git"
              className="flex gap-1 text-md text-foreground/60 hover:text-foreground"
            >
              Give star
              <Star className="size-5 mt-0.5" />
            </Link>
            <Link
              href="https://github.com/Karan-develops"
              className="flex gap-1 text-md text-foreground/60 hover:text-foreground"
            >
              GitHub
              <GithubIcon className="size-5 mt-0.5" />
            </Link>
          </div>
          <div className="flex items-center space-x-1 text-sm text-foreground/60">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by</span>
            <a
              href="https://github.com/Karan-develops"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              Karan Aggarwal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
