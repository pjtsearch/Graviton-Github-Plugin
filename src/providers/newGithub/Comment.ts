import * as types from "../types"
import * as githubTypes from "./types"
import { UserInfo } from "../../actions"
import { Octokit } from "@octokit/rest"
import { ProviderAction } from "../Provider"
import { User } from "./User"

interface Deps {
  octokit: Octokit
}

export class Comment implements types.Comment, ProviderAction {
  deps: Deps
  repo: types.Repo
  url!: string
  id!: number
  altId!: string
  creator!: types.User
  createdDate!: Date
  updatedDate!: Date
  body!: string

  constructor({ repo, id, value }: { repo: types.Repo; id?: number; value?: githubTypes.Comment }, deps: Deps) {
    this.deps = deps
    this.repo = repo
    if (id) this.id = id
    if (value) {
      const parsed = this.parse(value)
      Object.assign(this, parsed)
    }
    return this
  }
  private parse(comment: githubTypes.Comment): types.Comment {
    return {
      url: comment.html_url,
      id: comment.id,
      altId: comment.node_id,
      creator: new User({ value: comment.user }, this.deps),
      createdDate: new Date(comment.created_at),
      updatedDate: new Date(comment.updated_at),
      body: comment.body,
    }
  }
}
