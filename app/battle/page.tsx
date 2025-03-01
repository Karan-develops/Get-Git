"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GithubIcon, Trophy, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BattlePage() {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!player1 || !player2) {
      setError("Please enter both GitHub usernames");
      return;
    }

    if (player1 === player2) {
      setError("Please enter two different GitHub usernames");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      router.push(`/battle/results?player1=${player1}&player2=${player2}`);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="container max-w-4xl py-12">
        <h1 className="flex justify-center gap-2 text-3xl font-bold text-center mb-8">
          <Zap className="mt-1 text-orange-500" />
          GitHub Battle <Zap className="mt-1 text-orange-500" />
        </h1>
        <p className="text-center text-lg text-orange-500 mb-8">
          Enter two GitHub usernames to compare their profiles and see who comes
          out on top.
        </p>

        {error && (
          <div className="bg-destructive/15 text-destructive dark:text-white p-4 rounded-md mb-6 text-center border">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Player One
                </CardTitle>
                <CardDescription>
                  Enter the first GitHub username
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="player1">GitHub Username</Label>
                  <div className="relative">
                    <GithubIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="player1"
                      placeholder="e.g., facebook"
                      className="pl-9"
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Player Two
                </CardTitle>
                <CardDescription>
                  Enter the second GitHub username
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="player2">GitHub Username</Label>
                  <div className="relative">
                    <GithubIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="player2"
                      placeholder="e.g., google"
                      className="pl-9"
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="gap-2 hover:cursor-pointer"
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Trophy className="h-5 w-5" />
                  Battle!
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
