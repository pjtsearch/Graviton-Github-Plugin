import * as types from "../types"
class Issue implements types.Issue {
  repo: types.Repo | { owner: string; name: string }
  title: string
  id: number
  altId: string
  number: number
  creator: types.User
  labels: types.Label[]
  state: string
  locked: boolean
  assignees: types.User[]
  milestone: any
  commentsAmount: number
  createdDate: Date
  updatedDate: Date
  closedDate: Date
  body: string
  //             Can pass Repo here   |
  //                                  v
  constructor(args: { repo: types.Repo | { owner: string; name: string }; issueNumber?: number; value?: types.Issue }) {
    this.repo = args.repo
    if (args.issueNumber) this.number = args.issueNumber
    if (args.value) {
      Object.entries(args.value).forEach(([k, v]) => {
        this[k] = v
      })
    } else {
      return this
    }
  }
  async update() {}
}
