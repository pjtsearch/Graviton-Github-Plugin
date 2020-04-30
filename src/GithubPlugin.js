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

import { UserInfo } from './actions/UserInfo';

  export const GithubPlugin = ({API})=>createComponent("github-plugin",()=>{
    const [provider,$provider] = useState(null)
    useEffect(async ()=>{
        API.RunningConfig.on('addFolderToRunningWorkspace', async()=>{
            $provider(await getProvider({API}))
        })
    })

    return html`
        <div>
          <d-title>Github</d-title>
          ${provider ? UserInfo({provider}) : "Loading"}
        </div>
    `;
},API.puffin)