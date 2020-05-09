export interface Issue {
  title: string
  id: number
  altId: string
  number: number
  creator: User
  labels: Label[]
  state: string
  locked: boolean
  assignees: User[]
  //  FIXME: parse milestone if neccessary
  milestone: any
  commentsAmount: number
  createdDate: Date
  updatedDate: Date
  closedDate: Date | null
  body: string
}

export interface User {
  login: string
  id: number
  altId: string
  avatar: string
  url: string
}

export interface Label {
  name: string
  id: number
  altId: string
  color: string
  description: string
}
