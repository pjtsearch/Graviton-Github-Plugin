export interface Issue {
  title: string
  id: number
  altId: string
  number: number
  creator: User
  labels: Label[]
  state: string
  locked: boolean
  assignees: User[]
  //  FIXME: parse milestone if neccessary
  milestone: any
  commentsAmount: number
  createdDate: Date
  updatedDate: Date
  closedDate: Date | null
  body: string
}

export interface User {
  login: string
  id: number
  altId: string
  avatar: string
  url: string
}

export interface Label {
  name: string
  id: number
  altId: string
  color: string
  description: string
}

export interface Comment {
  url: string
  id: number
  altId: string
  creator: User
  createdDate: Date
  updatedDate: Date
  body: string
}

export interface Team {
  url: string
  id: number
  altId: string
  name: string
  slug: string
  description: string
}

export interface PullRequest {
  title: string
  id: number
  altId: string
  number: number
  creator: User
  labels: Label[]
  state: string
  locked: boolean
  assignees: User[]
  //  FIXME: parse milestone if neccessary
  milestone: any
  createdDate: Date
  updatedDate: Date
  closedDate: Date | null
  mergedDate: Date | null
  mergeCommitSHA: string | null
  body: string
  url: string
  diffUrl: string
  reviewers: User[]
  reviewTeams: Team[]
  head: {
    label: string
    ref: string
    sha: string
    user: User
    repo: Repo
  }
  base: {
    label: string
    ref: string
    sha: string
    user: User
    repo: Repo
  }
}

export interface Repo {
  id: number
  altId: string
  name: string
  repoName: string
  owner: User
  private: boolean
  url: string
  description: string
  fork: boolean
  gitUrl: string
  sshUrl: string
  cloneUrl: string
  mirrorUrl: string
  homepage: string
  language: string | null
  forks: number
  stars: number
  watchers: number
  size: number
  defaultBranch: string
  openIssues: number
  topics: string[]
  capabilities: {
    issues: boolean
    projects: boolean
    wiki: boolean
    pages: boolean
    downloads: boolean
  }
  archived: boolean
  disabled: boolean
  visibility: string
  pushedDate: Date | null
  createdDate: Date
  updatedDate: Date
  allowedMergeTypes: {
    rebase: boolean
    squash: boolean
    commit: boolean
  }
  tempCloneToken: string
}
