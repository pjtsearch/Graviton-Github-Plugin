import * as types from "../types"
import * as githubTypes from "./types"
import { Octokit } from "@octokit/rest"
import { User } from "./User"
import { Issue } from "./Issue"
import { ProviderAction } from "../Provider"

interface Deps {
  octokit: Octokit
}

export class Repo implements types.Repo, ProviderAction {
  deps: Deps
  id!: number
  altId!: string
  name!: string
  repoName!: string
  owner!: types.User
  private!: boolean
  url!: string
  description!: string
  fork!: boolean
  gitUrl!: string
  sshUrl!: string
  cloneUrl!: string
  mirrorUrl!: string
  homepage!: string
  language!: string
  forks!: number
  stars!: number
  watchers!: number
  size!: number
  defaultBranch!: string
  openIssues!: number
  topics?: string[]
  capabilities!: {
    issues: boolean
    projects: boolean
    wiki: boolean
    pages: boolean
    downloads: boolean
  }
  archived?: boolean
  disabled?: boolean
  visibility?: string
  pushedDate!: Date
  createdDate!: Date
  updatedDate!: Date
  allowedMergeTypes!: {
    rebase?: boolean
    squash?: boolean
    commit?: boolean
  }
  tempCloneToken?: string
  constructor({ owner, name, value }: { owner?: string; name?: string; value: githubTypes.Repo }, deps: Deps) {
    this.deps = deps
    if (owner) this.owner = new User({ name: owner }, this.deps)
    if (name) this.name = name
    if (value) {
      const parsed = this.parse(value)
      Object.assign(this, parsed)
    }
    return this
  }
  async fetch() {
    const { data: raw } = await this.deps.octokit.repos.get({
      owner: this.owner.login,
      repo: this.name,
    })
    const parsed = this.parse(raw)
    Object.assign(this, parsed)
    return this
  }
  get issues() {
    return (async () => {
      const { data: raw } = await this.deps.octokit.issues.listForRepo({
        owner: this.owner.login,
        repo: this.name,
      })
      const data = raw.map((value) => new Issue({ repo: this, value }, this.deps))
      return data
    })()
  }
  private parse(r: githubTypes.Repo): types.Repo {
    return {
      id: r.id,
      altId: r.node_id,
      name: r.name,
      repoName: r.full_name,
      owner: new User({ value: r.owner }, this.deps),
      private: r.private,
      url: r.html_url,
      description: r.description,
      fork: r.fork,
      gitUrl: r.git_url,
      sshUrl: r.ssh_url,
      cloneUrl: r.clone_url,
      mirrorUrl: r.mirror_url,
      homepage: r.homepage,
      language: r.language,
      forks: r.forks_count,
      stars: r.stargazers_count,
      watchers: r.watchers_count,
      size: r.size,
      defaultBranch: r.default_branch,
      openIssues: r.open_issues_count,
      topics: r.topics,
      capabilities: {
        issues: r.has_issues,
        projects: r.has_projects,
        wiki: r.has_wiki,
        pages: r.has_pages,
        downloads: r.has_downloads,
      },
      archived: r.archived,
      disabled: r.disabled,
      visibility: r.visibility,
      pushedDate: r.pushed_at ? new Date(r.pushed_at || "") : null,
      createdDate: new Date(r.created_at),
      updatedDate: new Date(r.updated_at),
      allowedMergeTypes: {
        rebase: r.allow_rebase_merge,
        squash: r.allow_squash_merge,
        commit: r.allow_merge_commit,
      },
      tempCloneToken: r.temp_clone_token,
    }
  }
}
