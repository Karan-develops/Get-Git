"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRepoCommits } from "@/lib/github-api";
import SiteLoader from "@/components/SiteLoader";
import { Plane } from "lucide-react";
import Link from "next/link";

export default function InsightsPage() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<{
    languageData: Record<string, number>;
    commitActivityData: { name: string; commits: number }[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/github/${username}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();

      const { userData, reposData } = data.userData;

      const languageData = reposData.reduce(
        (acc: Record<string, number>, repo: { language: string }) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        },
        {}
      );

      const commitActivityData = await Promise.all(
        reposData.slice(0, 5).map(async (repo: { name: string }) => {
          const commits = await fetchRepoCommits(username, repo.name);
          return {
            name:
              repo.name.length > 10
                ? repo.name.slice(0, 10) + "..."
                : repo.name,
            commits: commits.length,
          };
        })
      );
      commitActivityData.sort((a, b) => b.commits - a.commits);

      setUserData({ ...userData, languageData, commitActivityData });
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setError("Error fetching user insights. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">GitHub Insights</h1>
      <div className="max-w-md mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={fetchInsights} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Insights"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {isLoading ? (
        <SiteLoader />
      ) : (
        userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={Object.entries(userData.languageData).map(
                        ([name, value]) => ({ name, value })
                      )}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {Object.entries(userData.languageData).map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commit Activity (Top 5 Repos)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userData.commitActivityData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commits" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Link
              href={`https://github.com/${username}`}
              className="flex justify-end gap-2"
              target="_blank"
            >
              <Button className="flex items-center gap-2 hover:cursor-pointer">
                Visit Profile <Plane />
              </Button>
            </Link>
          </motion.div>
        )
      )}
    </div>
  );
}
