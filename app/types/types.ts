export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
}

export interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

export interface PlayerData {
  user: GitHubUser;
  score: number;
  stars: number;
}
