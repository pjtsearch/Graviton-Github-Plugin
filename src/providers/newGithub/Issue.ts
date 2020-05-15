import * as types from "../types"
import * as githubTypes from "./types"
import { UserInfo } from "../../actions"
import { Octokit } from "@octokit/rest"
import { User } from "./User"
import { Label } from "./Label"

interface Deps {
  octokit: Octokit
}

export class Issue implements types.Issue {
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
  constructor(deps: Deps) {
    this.deps = deps
  }
  fromData(value: githubTypes.Issue) {
    const parsed = this.parse(value)
    Object.assign(this, parsed)
    return this
  }
  async fromFetch({ repo, issueNumber }: { repo: { owner: string; name: string }; issueNumber: number }) {
    const { data: raw } = await this.deps.octokit.issues.get({
      owner: repo.owner,
      repo: repo.name,
      issue_number: issueNumber,
    })
    const parsed = this.parse(raw)
    Object.assign(this, parsed)
    return this
  }
  private parse(issue: githubTypes.Issue): types.Issue {
    return {
      title: issue.title,
      id: issue.id,
      altId: issue.node_id,
      number: issue.number,
      creator: new User(this.deps).fromData(issue.user),
      labels: issue.labels.map(new Label(this.deps).fromData),
      state: issue.state,
      locked: issue.locked,
      assignees: issue.assignees.map(new User(this.deps).fromData),
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
