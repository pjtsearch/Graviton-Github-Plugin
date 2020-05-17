import * as types from "../types"
import * as githubTypes from "./types"
import { UserInfo } from "../../actions"
import { Octokit } from "@octokit/rest"
import { ProviderAction } from "../Provider"

interface Deps {
  octokit: Octokit
}

export class Label implements types.Label, ProviderAction {
  deps: Deps
  name!: string
  id!: number
  altId!: string
  color!: string
  description!: string

  constructor(deps: Deps) {
    this.deps = deps
  }

  fromData(value: githubTypes.Label) {
    const parsed = this.parse(value)
    Object.assign(this, parsed)
    return this
  }
  private parse(label: githubTypes.Label): types.Label {
    return {
      name: label.name,
      id: label.id,
      altId: label.node_id,
      color: label.color,
      description: label.description,
    }
  }
}
