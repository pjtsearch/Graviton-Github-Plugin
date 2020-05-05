import { useState,useEffect } from 'preact/hooks';
import { html } from 'htm/preact';

import {DracText,DracCard,DracButton,DracInput} from "../../components/index"
// import {DracText,DracCard,DracInput,DracTitle,DracButton} from "../../components/index"
import styled from 'preact-css-styled';


const styles = styled("div", `
{
  position:relative;
}
#issue{
  position:relative;
  height:calc(100% - 3px);
  /* width:100%;*/
}
#input-box{
  width:calc(100% - 7px);
  display: grid;
  grid-template-columns: 1fr auto;
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
  border-radius:10px;
  overflow:hidden;
  background:var(--controlButtonsHoverBackground);
}
#input-box > d-input {
  --inputBackground: var(--controlButtonsHoverBackground);
}
#issue-wrapper{
  overflow:auto;
  height: calc(100% - 46px);
  padding-bottom:50px;
  box-sizing: border-box;
}
:host ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    transition: all 0.1s ease 0s;
}
:host ::-webkit-scrollbar-corner {
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0px !important;
    width: 0px !important;
    display: none !important;
}
:host ::-webkit-scrollbar-thumb {
    border-radius: 0.2rem;
    transition: all 0.1s ease 0s;
}
:host ::-webkit-scrollbar-track {
}
`)

export const Issue = ({provider,open,args:{number:issueNumber}}:{provider:any,open:Function,args?:any})=>{
    let [comments,$comments]:any[] = useState([])
    let [issue,$issue]:any[] = useState({})
    let [comment,$comment] = useState("")

    const update = async ()=> {
      $issue(await provider.getIssue({issueNumber}))
      $comments(await provider.getIssueComments({issueNumber}))
    }


    useEffect(()=>{
        update()
    }, [])

    const createComment = async (body:string)=>{
      console.log(await provider.createComment({issueNumber,body}))
      await update()
    }

    return html`
        <${styles} id="issue">
            <div id="issue-wrapper">
              ${issue.title
                ?
                html`
                <${DracText} level=${2}>${issue.title}</${DracText}>
                <${DracCard} width=${"calc(100% - 10px)"}>
                  <img height="20" src=${issue.creator.avatar}/>
                  <${DracText} inline=${true}>${issue.creator.login}</${DracText}>
                  <br/>
                  <${DracText}>${issue.body}</${DracText}>
                </${DracCard}>
                `
                :
                html`<p>Loading...</p>`
              }
              ${comments.length
                ?
                comments.map((comment:any)=>html`
                <${DracCard} width=${"calc(100% - 10px)"}>
                  <img height="20" src=${comment.creator.avatar}/>
                  <${DracText} inline=${true}>${comment.creator.login}</${DracText}>
                  <br/>
                  <${DracText}>${comment.body}</${DracText}>
                </${DracCard}>
                `)
                :
                html`Loading...`
              }
            </div>
            <div id="input-box">
              <${DracInput} onInput=${(e:any)=>$comment(e.target.value)} height=${"100%"}></${DracInput}>
              <${DracButton} onclick=${()=>createComment(comment)}>Send</${DracButton}>
            </div>
        </${styles}>
    `;
}

// export const open = async ({API,issueNumber,options}) =>{
//     var provider = await getProvider({API})
//     // var panel = options.panel
//     // if (!options.panel || !document.body.contains(options.panel)) {
//     //     panel = panels.create({API})
//     //     options.panel = panel
//     // }
//     // API.Tab({
//     //     title:`Issue #${issueNumber}`,
//     //     isEditor:false,
//     //     component:component({puffin:API.puffin,provider,issueNumber}),
//     //     panel,
//     //     id:`github-issue-${issueNumber}:${panel.id}`
//     // })
//     var comp = component({puffin:API.puffin,provider,issueNumber})
//     panels.openTab({
//         title:`Issue #${issueNumber}`,
//         component:comp,
//         id:`github-issue-${issueNumber}`,
//         API,
//         options
//     })
// }
