"use server";

async function fetchRepoCommits(username: string, repoName: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/commits`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch commits for ${repoName}`);
    }
    const commits = await response.json();
    return commits;
  } catch (error: any) {
    console.error(`Error fetching commits for ${repoName}:`, error);
    return [];
  }
}
