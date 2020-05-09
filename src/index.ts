import Github from "./providers/github/index"
import * as sidePanel from "./triggers/sidePanel"
export const entry = async (API: any) => {
  API.Notification({
    title: "Github",
    content: "Github started",
  })
  sidePanel.register({ API })
}
