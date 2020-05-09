import * as panels from "../../utilities/panels"
import getProvider from "../../utilities/getProvider"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { DracText } from "../../components/index"
import { PageHistory } from "../../utilities/PageHistory"

//FIXME: add provider type
export const UserInfo = ({ provider, hist, args }: { provider: any; hist?: PageHistory; args?: any }) => {
  let [data, $data]: any[] = useState(null)
  useEffect(() => {
    ;(async () => {
      $data(await provider.getUserInfo())
    })()
  }, [])

  return html`
    <div>
      ${data
        ? html`<img src="${data.avatar}"/>
            <${DracText}>Name: ${data.name}</${DracText}>
            <${DracText}>Login: ${data.login}</${DracText}>
            <${DracText}>Company: ${data.company}</${DracText}>
            <${DracText}>Blog: ${data.blog}</${DracText}>
            <${DracText}>Location: ${data.location}</${DracText}>
            <${DracText}>Email: ${data.email}</${DracText}>
            <${DracText}>Hireable: ${data.hireable}</${DracText}>
            <${DracText}>Bio: ${data.bio}</${DracText}>
            <${DracText}>Public Repositories: ${data.publicRepos}</${DracText}>
            <${DracText}>Private Repositories: ${data.privateRepos}</${DracText}>
            <${DracText}>Disk Usage: ${data.diskUsage}</${DracText}>
            <${DracText}>Plan: ${data.plan}</${DracText}>`
        : html` <${DracText}>Loading...</${DracText}> `}
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
//     //     title:"User Info",
//     //     isEditor:false,
//     //     component:component({puffin:API.puffin,provider}),
//     //     panel,
//     //     id:`user-info:${panel.id}`
//     // })
//     var comp = component({puffin:API.puffin,provider})

//     panels.openTab({
//         title:"User Info",
//         component:comp,
//         id:"user-info",
//         API,
//         options
//     })
// }
