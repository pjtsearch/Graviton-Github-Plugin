import { GithubPlugin } from "../GithubPlugin.ts"

export const register = ({ API, options }) => {
  const githubPlugin = GithubPlugin({ API })
  API.SidePanel({
    icon: () => API.puffin.element`<span style="color:white">G</span>`,
    panel: githubPlugin.component
  })
  githubPlugin.render()
}
