import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"
// import "../../components/DracButton"
// import "../../components/DracText"
// import "../../components/DracTitle"
// import "../../components/DracCard"

import { DracText, DracCard, DracTitle } from "../../components/index"
import { PageHistory } from "../../utilities/PageHistory"
import { openTab } from "../../utilities/openTab"
import { Issue } from "../Issue/index"

// const styles = (vars?) => `
// :host{
//   width:100%;
// }
// `
//FIXME: add provider type
export const Issues = ({
  API,
  provider,
  hist,
  args: { pr },
}: {
  API: any
  provider: any
  hist: PageHistory
  args?: any
}) => {
  //FIXME: add type
  let [issues, $issues]: any[] = useState([])
  let [loading, $loading]: [boolean, any] = useState(true)
  useEffect(() => {
    ;(async () => {
      if (!pr) {
        $loading(true)
        $issues(await provider.getIssues())
        $loading(false)
      } else if (pr) {
        $loading(true)
        $issues(await provider.getPullRequests())
        $loading(false)
      }
    })()
  }, [pr])

  return html`
        <div>
            <${DracTitle} level=${2}>${pr ? "Pull Requests" : "Issues"}</${DracTitle}>
            ${
              !loading
                ? issues.map(
                    (issue: any) => html`
            <${DracCard} width=${"calc(100% - 10px)"} onclick=${() =>
                      openTab({
                        API,
                        comp: Issue,
                        title: `#${issue.number}`,
                        provider,
                        pageArgs: { number: issue.number, pr },
                        id: `github-issue-${issue.number}`,
                      })}>
              <${DracText}>${issue.title}</${DracText}>
            </${DracCard}>
            `
                  )
                : html`
            <${DracText}>Loading...</${DracText}>
            `
            }
        </div>
    `
}

// export const open = async ({API,options}) =>{
//     var provider = await getProvider({API})
//     // var panel = options.panel
//     // if (!options.panel || !document.body.contains(options.panel)) {
//     //     panel = panels.create({API})
//     //     options.panel = panel
//     // }
//     // API.Tab({
//     //     title:"Issues",
//     //     isEditor:false,
//     //     component:component({API,options,puffin:API.puffin,provider}),
//     //     panel,
//     //     id:`github-issues:${panel.id}`
//     // })
//     var comp = component({API,options,puffin:API.puffin,provider})
//     panels.openTab({
//         title:"Issues",
//         component:comp,
//         id:"github-issues",
//         API,
//         options
//     })
// }
