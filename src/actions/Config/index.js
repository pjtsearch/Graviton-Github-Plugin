import * as panels from "../../utilities/panels"
import createComponent from "../../utilities/createComponent"
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
import "../../components/DracInput"
const styles = vars => `
:host{
  width:100%;
  margin:10px;
}
.field{
  display:block;
}
.field > *{
  display:inline-block;
}
`

const component = ({puffin,API,data,close})=>createComponent("github-config-"+new Date().valueOf(),()=>{
    const [form,setForm] = useState({
        auth:data.auth
    })
    const submit = form=>{
        API.StaticConfig.data.github = {...data,...form}
        close()
    }
    return html`
        <div>
            <style>${styles()}</style>
            <d-title>Config</d-title>
            <div class="field">
              <d-txt>Auth:</d-txt>
              <d-input @input=${e=>setForm({...form,auth:e.path[0].value})} .value=${data.auth}></d-input>
            </div>
            <d-btn @click=${()=>submit(form)}>Save</d-btn>
        </div>
    `;
},puffin)

export const open = async ({API}) =>{
    var data = API.StaticConfig.data.github
    const window = API.Window({
        component:component({puffin:API.puffin,API,data,close(){window.close()}}),
    })
    window.launch()
}
