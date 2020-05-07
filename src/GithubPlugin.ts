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
    hist.pushState({ page: "UserInfo", args: {} })
    API.RunningConfig.on("addFolderToRunningWorkspace", async () => {
      const p = await getProvider({ API })
      $provider(p)
    })
  }, [])

  return html`
    <div>
      ${Object.entries(pages).map(
        ([name]) => html`
        <${DracButton} onClick=${() => hist.pushState({ page: name, args: {} })}>${name}</${DracButton}>
      `
      )}
      ${page && provider && html` <${pages[page]} provider=${provider} hist=${hist} args=${pageArgs} /> `}
    </div>
  `
}

export const GithubPlugin = ({ API }: { API: { RunningConfig: any; puffin: any } }) =>
  createPreactComponent(html` <${Comp} API=${API} /> `, API.puffin)
