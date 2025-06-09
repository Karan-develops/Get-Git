"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchGitHubData } from "@/lib/github-api";
import SiteLoader from "@/components/SiteLoader";

export default function RoastPage() {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoast = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { userData, reposData } = await fetchGitHubData(username);
      const userInfo = {
        name: userData.name,
        bio: userData.bio,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        createdAt: userData.created_at,
        topLanguages: reposData
          .slice(0, 5)
          .map((repo: { language?: string | null }) => repo.language)
          .filter(Boolean),
      };

      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roast");
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setError("Error fetching Roasting data. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">GitHub Roast</h1>
      <div className="max-w-md mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button
            onClick={handleRoast}
            disabled={isLoading}
            className="hover:cursor-pointer"
          >
            {isLoading ? "Roasting..." : "Roast 😁"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {isLoading ? (
        <SiteLoader content="Generating Roast 😁" />
      ) : (
        roast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex justify-center items-center gap-2">
                  <Flame className="text-orange-500" />
                  Roast Result 😂💀
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg whitespace-pre-wrap">{roast}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      )}
    </div>
  );
}
