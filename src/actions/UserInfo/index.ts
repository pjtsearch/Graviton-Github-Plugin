import * as panels from "../../utilities/panels"
import getProvider from "../../utilities/getProvider"
import { useState,useEffect } from 'preact/hooks';
import { html } from 'htm/preact';

import "../../components/DracButton"
import "../../components/DracText"

export const UserInfo = ({provider})=>{
    let [data,$data] = useState(null)
    useEffect(()=>{(async ()=>{
        $data(await provider.getUserInfo())
    })()},[])

    return html`
        <div>
        ${data && html`<img src="${data.avatar}"/>
            <span>Name: ${data.name}</span>
            <span>Login: ${data.login}</span>
            <span>Company: ${data.company}</span>
            <span>Blog: ${data.blog}</span>
            <span>Location: ${data.location}</span>
            <span>Email: ${data.email}</span>
            <span>Hireable: ${data.hireable}</span>
            <span>Bio: ${data.bio}</span>
            <span>Public Repositories: ${data.publicRepos}</span>
            <span>Private Repositories: ${data.privateRepos}</span>
            <span>Disk Usage: ${data.diskUsage}</span>
            <span>Plan: ${data.plan}</span>`}
            
        </div>
    `;
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
