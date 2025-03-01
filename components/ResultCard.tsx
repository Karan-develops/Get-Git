import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, GithubIcon, Star, Trophy, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

interface PlayerData {
  user: GitHubUser;
  score: number;
  stars: number;
}

export function PlayerCard({
  playerData,
  isWinner,
  isTie,
}: {
  playerData: PlayerData;
  isWinner: boolean;
  isTie: boolean;
}) {
  return (
    <Card
      className={`
        ${isWinner ? "border-yellow-500 dark:border-yellow-500 shadow-lg" : ""}
        ${isTie ? "border-blue-500 dark:border-blue-500" : ""}
      `}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <GithubIcon className="h-5 w-5" />
            {playerData.user.login}
          </CardTitle>
          {isWinner && (
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              Winner
            </div>
          )}
          {isTie && (
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Tie
            </div>
          )}
        </div>
        <CardDescription>
          Score: {playerData.score.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={playerData.user.avatar_url || ""}
            alt={`${playerData.user.login}'s avatar`}
            fill
            className="rounded-full object-cover border-2 border-muted"
          />
        </div>
        <h3 className="text-xl font-bold mb-1">
          {playerData.user.name || playerData.user.login}
        </h3>
        {playerData.user.bio ? (
          <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
            {playerData.user.bio}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
            No bio provided.
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="bg-muted rounded-md p-3 text-center">
            <Users className="h-5 w-5 mx-auto mb-1" />
            <div className="text-lg font-bold">
              {playerData.user.followers.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="bg-muted rounded-md p-3 text-center">
            <Code className="h-5 w-5 mx-auto mb-1" />
            <div className="text-lg font-bold">
              {playerData.user.public_repos.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Repos</div>
          </div>
          <div className="bg-muted rounded-md p-3 text-center">
            <Star className="h-5 w-5 mx-auto mb-1" />
            <div className="text-lg font-bold">
              {playerData.stars.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Stars</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link
            href={playerData.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GithubIcon className="h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
