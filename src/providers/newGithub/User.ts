import * as types from "../types"
import * as githubTypes from "./types"
import { Label } from "../../components/Label"
import { UserInfo } from "../../actions"
import { Octokit } from "@octokit/rest"
import { ProviderAction } from "../Provider"

interface Deps {
  octokit: Octokit
}

export class User implements types.User, ProviderAction {
  deps: Deps
  login!: string
  id!: number
  altId!: string
  avatar!: string
  url!: string
  constructor({ name, value }: { name?: string; value?: githubTypes.User }, deps: Deps) {
    this.deps = deps
    if (name) this.login = name
    if (value) {
      const parsed = this.parse(value)
      Object.assign(this, parsed)
    }
    return this
  }
  private parse(user: githubTypes.User): types.User {
    return {
      login: user.login,
      id: user.id,
      altId: user.node_id,
      avatar: user.avatar_url,
      url: user.html_url,
    }
  }
}
