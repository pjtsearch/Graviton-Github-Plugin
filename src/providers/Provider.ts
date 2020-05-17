import { Issue, Comment, PullRequest } from "./types"
import * as types from "./types"
import { Octokit } from "@octokit/rest"

export interface Provider {
  repo: { owner: string; repo: string }
  getUserInfo(): Promise<any>
  getIssues(): Promise<Issue[]>
  getIssue({ issueNumber }: { issueNumber: number }): Promise<Issue>
  getIssueComments({ issueNumber }: { issueNumber: number }): Promise<Comment[]>
  closeIssue({ issueNumber }: { issueNumber: number }): any
  getPullRequestComments({ prNumber }: { prNumber: number }): Promise<Comment[]>
  createComment({ issueNumber, body }: { issueNumber: number; body: string }): any
  getPullRequest({ prNumber }: { prNumber: number }): Promise<PullRequest>
  getPullRequests(): Promise<PullRequest[]>
}

interface Deps {
  octokit: Octokit
}

export interface ProviderAction {
  deps: Deps
  fromData(value: any): this
}
