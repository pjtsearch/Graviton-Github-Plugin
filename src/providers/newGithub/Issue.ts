import * as types from "../types"
import * as githubTypes from "./types"
import { UserInfo } from "../../actions"
import { Octokit } from "@octokit/rest"
import { User } from "./User"
import { Label } from "./Label"
import { Comment } from "./Comment"
import { ProviderAction } from "../Provider"

interface Deps {
  octokit: Octokit
}

export class Issue implements types.Issue, ProviderAction {
  deps: Deps
  title!: string
  id!: number
  altId!: string
  number!: number
  creator!: types.User
  labels!: types.Label[]
  state!: string
  locked!: boolean
  assignees!: types.User[]
  milestone: any
  commentsAmount!: number
  createdDate!: Date
  updatedDate!: Date
  closedDate!: Date
  body!: string
  repo!: types.Repo
  constructor(
    { repo, issueNumber, value }: { repo: types.Repo; issueNumber?: number; value: githubTypes.Issue },
    deps: Deps
  ) {
    this.deps = deps
    this.repo = repo
    if (issueNumber) this.number = issueNumber
    if (value) {
      const parsed = this.parse(value)
      Object.assign(this, parsed)
    }
    return this
  }
  async fetch() {
    const { data: raw } = await this.deps.octokit.issues.get({
      owner: this.repo.owner.login,
      repo: this.repo.name,
      issue_number: this.number,
    })
    const parsed = this.parse(raw)
    Object.assign(this, parsed)
    return this
  }
  get comments() {
    return (async () => {
      const { data: raw } = await this.deps.octokit.issues.listComments({
        owner: this.repo.owner.login,
        repo: this.repo.name,
        issue_number: this.number,
      })
      const data = raw.map((value) => new Comment({ repo: this.repo, value }, this.deps))
      return data
    })()
  }
  private parse(issue: githubTypes.Issue): types.Issue {
    return {
      title: issue.title,
      id: issue.id,
      altId: issue.node_id,
      number: issue.number,
      creator: new User({ value: issue.user }, this.deps),
      labels: issue.labels.map((value: githubTypes.Label) => new Label({ repo: this.repo, value }, this.deps)),
      state: issue.state,
      locked: issue.locked,
      assignees: issue.assignees.map((value: githubTypes.User) => new User({ value }, this.deps)),
      //  FIXME: parse milestone if neccessary
      milestone: issue.milestone,
      commentsAmount: issue.comments,
      createdDate: new Date(issue.created_at),
      updatedDate: new Date(issue.updated_at),
      closedDate: issue.closed_at ? new Date(issue.closed_at || "") : null,
      body: issue.body,
    }
  }
}
