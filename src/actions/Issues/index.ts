import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"
// import "../../components/DracButton"
// import "../../components/DracText"
// import "../../components/DracTitle"
// import "../../components/DracCard"

import { DracText, DracCard, DracTitle } from "../../components/index"
import { PageHistory } from "../../utilities/PageHistory"

// const styles = (vars?) => `
// :host{
//   width:100%;
// }
// `
//FIXME: add provider type
export const Issues = ({ provider, hist, args }: { provider: any; hist: PageHistory; args?: any }) => {
  //FIXME: add type
  let [issues, $issues]: any[] = useState([])
  useEffect(() => {
    ;(async () => {
      $issues(await provider.getIssues())
    })()
  }, [])

  return html`
        <div>
            <${DracTitle} level=${2}>Issues</${DracTitle}>
            ${
              issues.length
                ? issues.map(
                    (issue: any) => html`
            <${DracCard} width=${"calc(100% - 10px)"} onclick=${() =>
                      hist.pushState({ page: "Issue", args: { number: issue.number } })}>
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
