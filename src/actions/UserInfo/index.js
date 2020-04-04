import panels from "../../utilities/panels"
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

const component = ({puffin,data})=>createComponent(puffin,"user-info",()=>{
    return html`
        <div>
            <img src="${data.avatar}"/>
            <drac-txt>Name: ${data.name}</drac-txt>
            <drac-txt>Login: ${data.login}</drac-txt>
            <drac-txt>Company: ${data.company}</drac-txt>
            <drac-txt>Blog: ${data.blog}</drac-txt>
            <drac-txt>Location: ${data.location}</drac-txt>
            <drac-txt>Email: ${data.email}</drac-txt>
            <drac-txt>Hireable: ${data.hireable}</drac-txt>
            <drac-txt>Bio: ${data.bio}</drac-txt>
            <drac-txt>Public Repositories: ${data.publicRepos}</drac-txt>
            <drac-txt>Private Repositories: ${data.privateRepos}</drac-txt>
            <drac-txt>Disk Usage: ${data.diskUsage}</drac-txt>
            <drac-txt>Plan: ${data.plan}</drac-txt>
        </div>
    `;
})
export const open = async ({API,provider}) =>{
    var data = await provider.getUserInfo()
    var panel = panels.create({API})
    API.Tab({
        title:"User Info",
        isEditor:false,
        directory:"",
        parentFolder:"",
        component:component({puffin:API.puffin,data}),
        panel
    })
}