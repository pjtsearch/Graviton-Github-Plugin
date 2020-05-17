import { createPreactComponent } from "../../utilities/createComponent"
import getProvider, { getProviderRepo } from "../../utilities/getProvider"
import { Component } from "preact"
import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"

import { UserInfo, Issues, Issue, Config } from "../index"

import { PageHistory, Page } from "../../utilities/PageHistory"
import { SidePanelMenu } from "./SidePanelMenu"

import AccountOutlineIcon from "mdi-preact/AccountOutlineIcon"
import AlertCircleOutlineIcon from "mdi-preact/AlertCircleOutlineIcon"
import SourcePullIcon from "mdi-preact/SourcePullIcon"
import SettingsOutlineIcon from "mdi-preact/SettingsOutlineIcon"
import styled from "preact-css-styled"

const pageWrapper = styled(
  "div",
  `
{
  height: calc(100% - 54px);
  overflow:auto;
}
`
)

const Comp = ({ API }: { API: { RunningConfig: any } }) => {
  const pages: { [key: string]: (...args: any) => preact.VNode<{}> } = {
    // UserInfo,
    Issues,
    // Issue,
    // Config,
  }
  const [page, $page] = useState("")
  const [pageArgs, $pageArgs] = useState({})
  const [provider, $provider]: [any, any] = useState(null)
  let [loading, $loading]: [boolean, any] = useState(true)
  let [hist, $hist] = useState(
    new PageHistory((page: Page) => {
      $page(page.page)
      $pageArgs(page.args)
    })
  )
  const [menuItems] = useState([
    // { name: "User Info", onClick: () => hist.pushState({ page: "UserInfo", args: {} }), icon: AccountOutlineIcon },
    {
      name: "Issues",
      onClick: () => hist.pushState({ page: "Issues", args: { pr: false } }),
      icon: AlertCircleOutlineIcon,
    },
    // {
    //   name: "Pull Requests",
    //   onClick: () => hist.pushState({ page: "Issues", args: { pr: true } }),
    //   icon: SourcePullIcon,
    // },
    // {
    //   name: "Config",
    //   onClick: () => hist.pushState({ page: "Config", args: { $provider } }),
    //   icon: SettingsOutlineIcon,
    // },
  ])

  useEffect(() => {
    hist.pushState({ page: "UserInfo", args: {} })
    API.RunningConfig.on("addFolderToRunningWorkspace", async () => {
      $loading(true)
      try {
        $provider(await getProviderRepo({ API }))
        // console.log(await getProviderRepo({ API }))
      } catch (err) {
        hist.pushState({ page: "Config", args: { $provider } })
      }
      $loading(false)
    })
  }, [])

  return html`
    <div>
      <${SidePanelMenu} items=${menuItems}></${SidePanelMenu}>
      <${pageWrapper}>
        ${!loading && html` <${pages[page]} API=${API} provider=${provider} hist=${hist} args=${pageArgs} /> `}
      </${pageWrapper}>
    </div>
  `
}

export const SidePanel = ({ API }: { API: { RunningConfig: any; puffin: any } }) =>
  createPreactComponent(html` <${Comp} API=${API} /> `, API.puffin)
