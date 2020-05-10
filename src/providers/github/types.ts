export interface Issue {
  title: string
  id: number
  node_id: string
  number: number
  user: any
  labels: any
  state: string
  locked: boolean
  assignees: any
  milestone: any
  comments: number
  created_at: string
  updated_at: string
  closed_at: string | null
  body: string
}

export interface PullRequest {
  title: string
  id: number
  node_id: string
  number: number
  user: any
  labels: any
  state: string
  locked: boolean
  assignees: any
  milestone: any
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  merge_commit_sha: string | null
  body: string
  html_url: string
  diff_url: string
  requested_reviewers: any
  requested_teams: any
  head: any
  base: any
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  html_url: string
}

export interface Label {
  id: number
  node_id: string
  name: string
  color: string
  default: boolean
  description: string
}

export interface Comment {
  html_url: string
  id: number
  node_id: string
  user: any
  created_at: string
  updated_at: string
  body: string
}

export interface Team {
  id: number
  node_id: string
  html_url: string
  name: string
  slug: string
  description: string
}

export interface Repo {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: any
  private: boolean
  html_url: string
  description: string
  fork: boolean
  git_url: string
  ssh_url: string
  clone_url: string
  mirror_url: string
  homepage: string
  language: string | null
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  topics: string[]
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  pushed_at: string | null
  created_at: string
  updated_at: string
  allow_rebase_merge: boolean
  allow_squash_merge: boolean
  allow_merge_commit: boolean
  temp_clone_token: string
}
