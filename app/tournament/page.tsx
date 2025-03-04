"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CircleSmall, Laugh, TrendingUp, Trophy, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Participant {
  username: string;
  score: number;
}

export default function TournamentPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [winner, setWinner] = useState<Participant | null>(null);

  const addParticipant = async () => {
    setWinner(null);
    setIsLoading(true);
    setError("");

    if (participants.some((p) => p.username === newParticipant)) {
      setError("Participant already added!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/github/${newParticipant}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();

      const { userData, reposData } = data.userData;
      const score =
        userData.followers * 3 +
        userData.public_repos * 2 +
        reposData.reduce(
          (sum: number, repo: { stargazers_count: number }) =>
            sum + repo.stargazers_count,
          0
        );
      setParticipants([...participants, { username: newParticipant, score }]);
      setNewParticipant("");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setError("Error Fetching user data. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteParticipant = (username: string) => {
    setParticipants(participants.filter((p) => p.username !== username));
  };

  const sortedParticipants = [...participants]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const startTournament = () => {
    if (participants.length < 2) {
      setError("Need at least 2 participants to start a tournament");
      return;
    }

    let currentParticipants = [...participants];
    while (currentParticipants.length > 1) {
      const nextRound: Participant[] = [];
      for (let i = 0; i < currentParticipants.length; i += 2) {
        if (i + 1 < currentParticipants.length) {
          nextRound.push(
            currentParticipants[i].score > currentParticipants[i + 1].score
              ? currentParticipants[i]
              : currentParticipants[i + 1]
          );
        } else {
          nextRound.push(currentParticipants[i]);
        }
      }
      currentParticipants = nextRound;
    }
    setWinner(currentParticipants[0]);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="flex justify-center gap-2 text-3xl font-bold text-center mb-8">
        GitHub Battle Tournament <TrendingUp className="mt-1 text-green-500" />
      </h1>
      <div className="max-w-md mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter GitHub username"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
          <Button onClick={addParticipant} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Participant"}
          </Button>
          {winner && (
            <Button
              onClick={() => {
                setWinner(null);
                participants.length = 0;
              }}
            >
              Reset Tournament
            </Button>
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {participants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Card className="w-[50vw] border border-orange-400">
            <CardHeader>
              <CardTitle className="flex gap-2">
                {participants.length} - Participants
                <Laugh className="size-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {participants.map((participant, index) => (
                  <li key={index} className="mb-2 flex items-center gap-2">
                    <CircleSmall className="fill-current size-5" />
                    {participant.username}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteParticipant(participant.username)}
                      className="hover:cursor-pointer"
                    >
                      <Trash2 className="text-red-500 size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <Button onClick={startTournament} className="mt-4">
                Start Tournament
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {winner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center gap-2"
        >
          <Card className="border border-amber-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 text-yellow-500" />
                Tournament Winner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{winner.username}</p>
              <p>Final Score: {winner.score}</p>
            </CardContent>
          </Card>
          <Card className="border border-green-400">
            <CardHeader>
              <CardTitle>🏆 Top 3 Participants</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedParticipants.map((p, i) => (
                <p
                  key={i}
                  className={`text-lg ${
                    i === 0 ? "font-bold text-yellow-500" : ""
                  }`}
                >
                  {i + 1}. {p.username} - {p.score}
                </p>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
