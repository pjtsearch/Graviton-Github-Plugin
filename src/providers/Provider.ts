import { Issue } from "./types"

export interface Provider {
  getIssues(): Promise<Issue[]>
  getIssue({ issueNumber }: { issueNumber: number }): Promise<Issue>
}
