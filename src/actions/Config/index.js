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

const component = ({puffin,API,data})=>createComponent("github-config-"+Math.floor(Math.random() * 100000),()=>{
    const [form,setForm] = useState({
        auth:null
    })
    const submit = form=>{
        API.StaticConfig.data.github = {...data,...form}
    }
    return html`
        <div>
            <d-title>Config</d-title>
            <label>Auth:</label>
            <d-input @input=${e=>setForm({...form,auth:e.path[0].value})} .value=${data.auth}></d-input>
            <d-btn @click=${()=>submit(form)}>Submit</d-btn>
        </div>
    `;
},puffin)

export const open = async ({API}) =>{
    var data = API.StaticConfig.data.github
    const window = API.Window({
        component:component({puffin:API.puffin,API,data}),
    })
    window.launch()
}
