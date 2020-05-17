import { Octokit } from "@octokit/rest"
import * as types from "./types"
import github from "../providers/newGithub/index"
import parseGHUrl from "parse-github-url"
import * as git from "isomorphic-git"
import * as fs from "fs"
import { ProviderAction } from "./Provider"

interface Deps {
  octokit: Octokit
}

export class ProviderController {
  //TODO: fix types
  repo!: any
  deps!: Deps
  provider!: {
    Repo: any
    Issue: any
    Label: any
    User: any
  }
  async init(API: any) {
    const dir = API.RunningConfig.data.workspaceConfig.folders[0].path
    const raw = <{ owner: string; name: string }>parseGHUrl((await git.listRemotes({ fs, dir }))[0].url)
    this.deps = { octokit: new Octokit({ auth: API.StaticConfig.data.github.auth }) }
    const providerName = API.StaticConfig.data.github.provider
    if (providerName === "github") this.provider = github
    this.repo = await new this.provider.Repo(this.deps).fromFetch(raw)
    return this
  }
}
