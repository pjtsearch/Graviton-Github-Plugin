import * as panels from "../../utilities/panels"
import createComponent from "../../utilities/createComponent"
import getProvider from "../../utilities/getProvider"
// import * as Issue from "../Issue"
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
import "../../components/DracTitle"
import "../../components/DracCard"

const styles = vars => `
:host{
  width:100%;
}
`

const component = ({API,options,puffin,provider})=>createComponent("github-pullrequests-"+provider.repo.owner.toLowerCase()+provider.repo.repo.toLowerCase(),()=>{
    let [prs,$prs] = useState([])
    useEffect(async ()=>{
        $prs(await provider.getPullRequests())
    }, [])

    return html`
        <style>${styles()}</style>
        <div>
            <d-title .level=${2}>Pull Requests</d-title>
            ${prs.length
            ?
            prs.map(pr=>html`
            <d-card .width=${"calc(100% - 10px)"} @click=${()=>{}}>
              <d-txt>${pr.title}</d-txt>
            </d-card>
            `)
            :
            html`
            <d-txt>Loading...</d-txt>
            `
            }
        </div>
    `;
},puffin)

export const open = async ({API,options}) =>{
    var provider = await getProvider({API})
    var comp = component({API,options,puffin:API.puffin,provider})
    panels.openTab({
        title:"Pull Requests",
        component:comp,
        id:"github-pullrequests",
        API,
        options
    })
}
