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
import "../../components/DracInput"

const styles = vars => `
:host{
  width:100%;
}
#issue{
  position:relative;
  height:calc(100% - 3px);
  width:100%;
}
#input-box{
  position:absolute;
  width:100%;
  bottom:0;
  left:0;
  display: grid;
  grid-template-columns: 1fr auto;
}
`

const component = ({puffin,provider,issueNumber})=>createComponent(`github-issue-${issueNumber}`,()=>{
    let [comments,$comments] = useState(null)
    let [issue,$issue] = useState(null)
    let [comment,$comment] = useState(null)

    const update = async ()=> {
      $issue(await provider.getIssue({issueNumber}))
      $comments(await provider.getIssueComments({issueNumber}))
    }


    useEffect(async ()=>{
        await update()
    }, [])

    const createComment = async body=>{
      console.log(await provider.createComment({issueNumber,body}))
      await update()
    }

    return html`
        <style>${styles()}</style>
        <div id="issue">
            <!-- <d-txt><pre>${JSON.stringify(comments,null,2)}</pre></d-txt>
            <d-txt><pre>${JSON.stringify(issue,null,2)}</pre></d-txt> -->
            ${issue
              ?
              html`
              <d-title .level=${2}>${issue.title}</d-title>
              <d-card .width=${"calc(100% - 10px)"}>
                <img height="20" src=${issue.creator.avatar}/>
                <d-txt .inline=${true}>${issue.creator.login}</d-txt>
                <br>
                <d-txt>${issue.body}</d-txt>
              </d-card>
              `
              :
              html`Loading...`
            }
            ${comments
              ?
              comments.map(comment=>html`
              <d-card .width=${"calc(100% - 10px)"}>
                <img height="20" src=${comment.creator.avatar}/>
                <d-txt .inline=${true}>${comment.creator.login}</d-txt>
                <br>
                <d-txt>${comment.body}</d-txt>
              </d-card>
              `)
              :
              html`Loading...`
            }
            <div id="input-box">
              <d-input @input=${e=>$comment(e.path[0].value)}></d-input>
              <d-btn @click=${()=>createComment(comment)}>Send</d-btn>
            </div>
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
