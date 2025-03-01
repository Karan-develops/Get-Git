"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayerCard } from "@/components/ResultCard";
import CardSkeleton from "@/components/CardSkeleton";

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

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

interface PlayerData {
  user: GitHubUser;
  score: number;
  stars: number;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const player1Username = searchParams.get("player1");
  const player2Username = searchParams.get("player2");

  const [player1Data, setPlayer1Data] = useState<PlayerData | null>(null);
  const [player2Data, setPlayer2Data] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async (username: string) => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!userResponse.ok)
          throw new Error(`GitHub user ${username} not found`);

        const userData: GitHubUser = await userResponse.json();

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const reposData: GitHubRepo[] = await reposResponse.json();

        const stars = reposData.reduce(
          (total, repo) => total + repo.stargazers_count,
          0
        );

        const score =
          userData.followers * 3 + userData.public_repos * 2 + stars * 1;

        return {
          user: userData,
          score,
          stars,
        };
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
        throw new Error("An error occurred fetching GitHub data");
      }
    };

    const fetchData = async () => {
      if (!player1Username || !player2Username) {
        setError("Missing player usernames");
        setIsLoading(false);
        return;
      }

      try {
        const [player1Result, player2Result] = await Promise.all([
          fetchUserData(player1Username),
          fetchUserData(player2Username),
        ]);

        setPlayer1Data(player1Result);
        setPlayer2Data(player2Result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [player1Username, player2Username]);

  const getWinner = () => {
    if (!player1Data || !player2Data) return null;

    if (player1Data.score > player2Data.score) {
      return player1Data;
    } else if (player2Data.score > player1Data.score) {
      return player2Data;
    }

    return null; // Draw Hogya
  };

  const winner = getWinner();

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container max-w-4xl py-12 text-center">
          <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">
            {error}
          </div>
          <Button asChild variant="outline">
            <Link href="/battle" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Battle
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="container max-w-4xl py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Battle Results</h1>
          <Button asChild variant="outline">
            <Link href="/battle" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              New Battle
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CardSkeleton />
          </div>
        ) : (
          <>
            {winner && (
              <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8 flex items-center justify-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                <span className="font-bold">
                  {winner.user.login} wins with a score of{" "}
                  {winner.score.toLocaleString()}!
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {player1Data && (
                <PlayerCard
                  playerData={player1Data}
                  isWinner={winner === player1Data}
                  isTie={
                    winner === null && player1Data.score === player2Data?.score
                  }
                />
              )}

              {player2Data && (
                <PlayerCard
                  playerData={player2Data}
                  isWinner={winner === player2Data}
                  isTie={
                    winner === null && player2Data.score === player1Data?.score
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
