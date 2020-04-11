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
import "../../components/DracTitle"
import "../../components/DracCard"

const component = ({puffin,provider})=>createComponent("github-issues",()=>{
    let [issues,$issues] = useState([])
    useEffect(async ()=>{
        $issues(await provider.getIssues())
    }, [])

    return html`
        <div>
            <d-title .level=${2}>Issues</d-title>
            ${issues.length
            ?
            issues.map(issue=>html`
            <d-card .width=${"calc(100% - 10px)"}>
              <d-txt>${issue.title}</d-txt>
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
    var panel = options.panel
    if (!options.panel || !document.body.contains(options.panel)) {
        panel = panels.create({API})
        options.panel = panel
    }
    API.Tab({
        title:"Issues",
        isEditor:false,
        component:component({puffin:API.puffin,provider}),
        panel,
        id:`github-issues:${panel.id}`
    })
}
