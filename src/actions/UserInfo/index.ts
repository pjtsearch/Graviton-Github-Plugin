import * as panels from "../../utilities/panels"
import createComponent from "../../utilities/createComponent"
import getProvider from "../../utilities/getProvider"
import {
    html,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useContext,
    virtual
  } from 'haunted';
import "../../components/DracButton"
import "../../components/DracText"

export const UserInfo = virtual(({provider})=>{
    let [data,$data] = useState(null)
    useEffect(()=>{(async ()=>{
        $data(await provider.getUserInfo())
    })()},[])

    return html`
        <div>
        ${data && html`<img src="${data.avatar}"/>
            <d-txt>Name: ${data.name}</d-txt>
            <d-txt>Login: ${data.login}</d-txt>
            <d-txt>Company: ${data.company}</d-txt>
            <d-txt>Blog: ${data.blog}</d-txt>
            <d-txt>Location: ${data.location}</d-txt>
            <d-txt>Email: ${data.email}</d-txt>
            <d-txt>Hireable: ${data.hireable}</d-txt>
            <d-txt>Bio: ${data.bio}</d-txt>
            <d-txt>Public Repositories: ${data.publicRepos}</d-txt>
            <d-txt>Private Repositories: ${data.privateRepos}</d-txt>
            <d-txt>Disk Usage: ${data.diskUsage}</d-txt>
            <d-txt>Plan: ${data.plan}</d-txt>`}
            
        </div>
    `;
})

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
