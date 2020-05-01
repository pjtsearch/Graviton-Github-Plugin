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
  import "./components/DracTitle"
  import createComponent from "./utilities/createComponent"
import getProvider from "./utilities/getProvider"

import { UserInfo, Issues } from './actions/index';

export const GithubPlugin = ({API})=>createComponent("github-plugin",()=>{
    const [provider,$provider] = useState(null)
    const [currentPage,$currentPage] = useState(null)
    const [pageArgs,$pageArgs] = useState(null)
    const pages = {
      "UserInfo":UserInfo,
      "Issues":Issues
    }
    useEffect(()=>{
      API.RunningConfig.on('addFolderToRunningWorkspace', async()=>{
          const p = await getProvider({API})
          $provider(p)
      })
    },[])
    useEffect(()=>{
      if (provider){
        open("Issues",{provider})
      }
    },[provider])


    const open = (page,args) => {
      $pageArgs(args)
      $currentPage(page)
    }
    return html`
        <div>
          <d-title>Github</d-title>
          ${!provider ? "Loading" : html`
            ${(pages[currentPage] && pageArgs) && pages[currentPage](pageArgs)}
          `}
        </div>
    `;
},API.puffin)