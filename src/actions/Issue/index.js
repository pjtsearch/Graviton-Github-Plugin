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

const component = ({puffin,provider,issueNumber})=>createComponent(`github-issue-${issueNumber}`,()=>{
    let [issue,$issue] = useState({})
    useEffect(async ()=>{
        $issue(await provider.getIssue({issueNumber}))
    }, [])

    return html`
        <div>
            <d-txt>${JSON.stringify(issue,null,2)}</d-txt>
        </div>
    `;
},puffin)

export const open = async ({API,issueNumber,options}) =>{
    var provider = await getProvider({API})
    var panel = options.panel
    if (!options.panel || !document.body.contains(options.panel)) {
        panel = panels.create({API})
        options.panel = panel
    }
    API.Tab({
        title:`Issue #${issueNumber}`,
        isEditor:false,
        component:component({puffin:API.puffin,provider,issueNumber}),
        panel,
        id:`github-issue-${issueNumber}:${panel.id}`
    })
}
