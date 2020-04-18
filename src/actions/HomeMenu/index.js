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
    useContext
  } from 'haunted';
import "../../components/DracButton"
import "../../components/DracText"
import * as Issues from "../Issues"
import * as Config from "../Config"
import * as UserInfo from "../UserInfo"

const component = ({puffin,actions})=>createComponent("github-home-menu",()=>{
    useEffect(async ()=>{

    })

    return html`
        <div>
          <d-title>Github</d-title>
          ${actions.map(action=>html`
          <d-card .width=${"calc(100% - 10px)"} @click=${()=>action.action()}>
            <d-txt>${action.title}</d-txt>
          </d-card>
          `)}
        </div>
    `;
},puffin)

export const open = async ({API,options}) =>{
    // var panel = options.panel
    // if (!options.panel || !document.body.contains(options.panel)) {
    //     // panel = panels.create({API,options,panelItems:options.panelItems.filter(o=>o.open!==open)})
    //     panel = panels.create({API,options,newItem:{open,name:"github-home-menu",args:{}}})
    //     options.panel = panel
    // }
    // options.panelItems.push({open,args:{}})

    const actions = [
      {title:"Issues",action:()=>Issues.open({API,options})},
      {title:"Config",action:()=>Config.open({API,options})},
      {title:"UserInfo",action:()=>UserInfo.open({API,options})}
    ]
    // API.Tab({
    //     title:"Github",
    //     isEditor:false,
    //     component:component({puffin:API.puffin,actions}),
    //     panel,
    //     id:`github-home-menu:${panel.id}`
    // })
    panels.openTab({
        title:"Github",
        component:component({puffin:API.puffin,actions}),
        id:"github-home-menu",
        API,
        options
    })
}

// export const toggle = ({API,options}) =>{
//   if (!options.panel || !document.body.contains(options.panel)){
//     open({API,options})
//   }else{
//     panels.remove({id:options.panel.id,RunningConfig:API.RunningConfig})
//   }
// }
