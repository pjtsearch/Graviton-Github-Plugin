import { Issue, Comment } from "./types"

export interface Provider {
  getIssues(): Promise<Issue[]>
  getIssue({ issueNumber }: { issueNumber: number }): Promise<Issue>
  getIssueComments({ issueNumber }: { issueNumber: number }): Promise<Comment[]>
  getPullRequestComments({ prNumber }: { prNumber: number }): Promise<Comment[]>
  createComment({ issueNumber, body }: { issueNumber: number; body: string }): any
}
