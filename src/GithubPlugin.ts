import { createPreactComponent } from "./utilities/createComponent"
import getProvider from "./utilities/getProvider"
import { Component } from "preact"
import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"

import { UserInfo, Issues, Issue } from "./actions/index"
import { DracButton } from "./components/index"

import { PageHistory, Page } from "./utilities/PageHistory"

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

  useEffect(() => {
    open("UserInfo", {})
    API.RunningConfig.on("addFolderToRunningWorkspace", async () => {
      const p = await getProvider({ API })
      $provider(p)
    })
  }, [])

  const open = (page: string, args: any) => {
    console.log("open", hist)
    hist.pushState({ page, args })
  }

  return html`
    <div>
      ${Object.entries(pages).map(
        ([name]) => html`
        <${DracButton} onClick=${() => open(name, {})}>${name}</${DracButton}>
      `
      )}
      ${page && provider && html` <${pages[page]} provider=${provider} open=${open} args=${pageArgs} /> `}
    </div>
  `
}

export const GithubPlugin = ({ API }: { API: { RunningConfig: any; puffin: any } }) =>
  createPreactComponent(html` <${Comp} API=${API} /> `, API.puffin)
