"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GithubIcon,
  Users,
  Star,
  GitFork,
  Code,
  MapPinHouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repoData, setRepoData] = useState<{
    stars: number;
    forks: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) throw new Error("User not found");

      const userData: GitHubUser = await userResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const reposData: GitHubRepo[] = await reposResponse.json();

      const stars = reposData.reduce(
        (total, repo) => total + repo.stargazers_count,
        0
      );
      const forks = reposData.reduce(
        (total, repo) => total + repo.forks_count,
        0
      );

      setUserData(userData);
      setRepoData({ stars, forks });
    } catch (err) {
      setError("Error fetching user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-7 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        GitHub Profile Stats
      </h1>
      <div className="max-w-md mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={fetchUserData} disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {userData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto border border-blue-600">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src={userData.avatar_url || "/placeholder.svg"}
                  alt={`${userData.name}'s avatar`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <CardTitle>{userData.name}</CardTitle>
                  <CardDescription>@{userData.login}</CardDescription>
                  <CardDescription className="flex gap-1">
                    <MapPinHouse className="size-4" />
                    {userData.location || "Earth"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {userData.bio || "No Bio."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="text-primary" />
                  <span>{userData.followers} followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-primary" />
                  <span>{userData.following} following</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="text-primary" />
                  <span>{userData.public_repos} repositories</span>
                </div>
                {repoData && (
                  <>
                    <div className="flex items-center gap-2">
                      <Star className="text-primary" />
                      <span>{repoData.stars} stars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitFork className="text-primary" />
                      <span>{repoData.forks} forks</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
