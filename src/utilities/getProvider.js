import Github from "../providers/github/index.ts"
import parseGHUrl from "parse-github-url"
import * as git from "isomorphic-git"
import * as fs from "fs"

export default async ({ API }) => {
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
  const repo = parseGHUrl((await git.listRemotes({ fs, dir }))[0].url)
  repo.repo = repo.name

  if (providerName === "github") {
    return new Github({ auth, dir, repo })
  }
}
