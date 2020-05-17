import Github from "../providers/github/index"
import parseGHUrl from "parse-github-url"
import * as git from "isomorphic-git"
import * as fs from "fs"
import { Repo } from "../providers/newGithub/Repo"
import { Octokit } from "@octokit/rest"
import * as github from "../providers/newGithub/index"

export default async ({ API }: { API: any }) => {
  if (!API.StaticConfig.data.github) {
    API.StaticConfig.data.github = {}
    console.log("no conf")
  }
  if (!API.StaticConfig.data.github.provider) API.StaticConfig.data.github.provider = "github"
  const providerName = API.StaticConfig.data.github.provider
  // console.log(API.StaticConfig.data.github.auth)
  if (!API.StaticConfig.data.github.auth) {
    API.Notification({
      title: "Github Plugin: No authentification provided",
      content: "Opening config",
    })
    throw new Error("Github Plugin: No authentification provided")
    // return
  }
  const auth = API.StaticConfig.data.github.auth
  const dir = API.RunningConfig.data.workspaceConfig.folders[0].path
  const repo = <{ owner: string; name: string; repo: string }>parseGHUrl((await git.listRemotes({ fs, dir }))[0].url)
  if (repo) repo.repo = repo.name

  if (providerName === "github") {
    return new Github({ auth, dir, repo })
  }
}

export const getProviderRepo = async ({ API }: { API: any }) => {
  const dir = API.RunningConfig.data.workspaceConfig.folders[0].path
  const raw = <{ owner: string; name: string }>parseGHUrl((await git.listRemotes({ fs, dir }))[0].url)
  const deps = { octokit: new Octokit({ auth: API.StaticConfig.data.github.auth }) }
  const providerName = API.StaticConfig.data.github.provider
  let provider
  if (providerName === "github") provider = github
  else provider = github
  const repo = await new provider.Repo(deps).fromFetch(raw)
  return { deps, repo, provider }
}
