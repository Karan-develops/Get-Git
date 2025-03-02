import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export async function fetchGitHubData(username: string) {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      octokit.rest.users.getByUsername({ username }),
      octokit.rest.repos.listForUser({ username, per_page: 100 }),
    ]);

    return {
      userData: userResponse.data,
      reposData: reposResponse.data,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw new Error("Failed to fetch GitHub data");
  }
}

export async function fetchUserEvents(username: string) {
  try {
    const response = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw new Error("Failed to fetch user events");
  }
}

export async function fetchRepoCommits(owner: string, repo: string) {
  try {
    const response = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 100,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repo commits:", error);
    throw new Error("Failed to fetch repo commits");
  }
}
