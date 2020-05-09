import { createPreactComponent } from "../../utilities/createComponent"
import getProvider from "../../utilities/getProvider"
import { Component } from "preact"
import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"

import { UserInfo, Issues, Issue } from "../index"

import { PageHistory, Page } from "../../utilities/PageHistory"
import { SidePanelMenu } from "./SidePanelMenu"

import AccountOutlineIcon from "mdi-preact/AccountOutlineIcon"
import AlertCircleOutlineIcon from "mdi-preact/AlertCircleOutlineIcon"
import SourcePullIcon from "mdi-preact/SourcePullIcon"

const Comp = ({ API }: { API: { RunningConfig: any } }) => {
  const pages: { [key: string]: (...args: any) => preact.VNode<{}> } = {
    UserInfo,
    Issues,
    Issue,
  }
  const [page, $page] = useState("")
  const [pageArgs, $pageArgs] = useState({})
  const [provider, $provider] = useState(null)
  let [hist, $hist] = useState(
    new PageHistory((page: Page) => {
      $page(page.page)
      $pageArgs(page.args)
    })
  )
  const [menuItems] = useState([
    { name: "User Info", onClick: () => hist.pushState({ page: "UserInfo", args: {} }), icon: AccountOutlineIcon },
    {
      name: "Issues",
      onClick: () => hist.pushState({ page: "Issues", args: { pr: false } }),
      icon: AlertCircleOutlineIcon,
    },
    {
      name: "Pull Requests",
      onClick: () => hist.pushState({ page: "Issues", args: { pr: true } }),
      icon: SourcePullIcon,
    },
  ])

  useEffect(() => {
    hist.pushState({ page: "UserInfo", args: {} })
    API.RunningConfig.on("addFolderToRunningWorkspace", async () => {
      const p = await getProvider({ API })
      $provider(p)
    })
  }, [])

  return html`
    <div>
      <${SidePanelMenu} items=${menuItems}></${SidePanelMenu}>
      ${page && provider && html` <${pages[page]} API=${API} provider=${provider} hist=${hist} args=${pageArgs} /> `}
    </div>
  `
}

export const SidePanel = ({ API }: { API: { RunningConfig: any; puffin: any } }) =>
  createPreactComponent(html` <${Comp} API=${API} /> `, API.puffin)
