import * as panels from "../../utilities/panels"
import createComponent from "../../utilities/createComponent"
import getProvider from "../../utilities/getProvider"
import * as Issue from "../Issue"
import { useState,useEffect } from 'preact/hooks';
import { html } from 'htm/preact';
// import "../../components/DracButton"
// import "../../components/DracText"
// import "../../components/DracTitle"
// import "../../components/DracCard"

import {DracText,DracCard} from "../../components/index"


// const styles = (vars?) => `
// :host{
//   width:100%;
// }
// `

export const Issues = ({provider})=>{
    let [issues,$issues] = useState([])
    useEffect(()=>{(async ()=>{
        $issues(await provider.getIssues())
    })()}, [])

    return html`
        <div>
            <${DracText}>Issues</${DracText}>
            ${issues.length
            ?
            issues.map(issue=>html`
            <${DracCard} width=${"calc(100% - 10px)"}>
              <${DracText}>${issue.title}</${DracText}>
            </${DracCard}>
            `)
            :
            html`
            <${DracText}>Loading...</${DracText}>
            `
            }
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
