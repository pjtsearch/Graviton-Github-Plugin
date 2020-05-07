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
  useContext,
} from "haunted"
import "../../components/DracButton"
import "../../components/DracText"
import "../../components/DracTitle"
import "../../components/DracCard"
import "../../components/DracInput"

const styles = (vars) => `
:host{
  width:100%;
}
#issue{
  position:relative;
  height:calc(100% - 3px);
  width:100%;
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
  height:100%;
  padding-bottom:45px;
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
`

const component = ({ puffin, provider, prNumber }) =>
  createComponent(
    `github-pr-${prNumber}`,
    () => {
      let [comments, $comments] = useState(null)
      let [pr, $pr] = useState(null)
      let [comment, $comment] = useState(null)

      const update = async () => {
        $pr(await provider.getPullRequest({ prNumber }))
        $comments(await provider.getPullRequestComments({ prNumber }))
      }

      useEffect(async () => {
        await update()
      }, [])

      const createComment = async (body) => {
        console.log(await provider.createComment({ issueNumber: prNumber, body }))
        await update()
      }

      return html`
        <style>
          ${styles()}
        </style>
        <div id="issue">
          <!-- <d-txt><pre>${JSON.stringify(comments, null, 2)}</pre></d-txt>
            <d-txt><pre>${JSON.stringify(pr, null, 2)}</pre></d-txt> -->
          <div id="issue-wrapper">
            ${pr
              ? html`
                  <d-title .level=${2}>${pr.title}</d-title>
                  <d-card .width=${"calc(100% - 10px)"}>
                    <img height="20" src=${pr.creator.avatar} />
                    <d-txt .inline=${true}>${pr.creator.login}</d-txt>
                    <br />
                    <d-txt>${pr.body}</d-txt>
                  </d-card>
                `
              : html` Loading... `}
            ${comments
              ? comments.map(
                  (comment) => html`
                    <d-card .width=${"calc(100% - 10px)"}>
                      <img height="20" src=${comment.creator.avatar} />
                      <d-txt .inline=${true}>${comment.creator.login}</d-txt>
                      <br />
                      <d-txt>${comment.body}</d-txt>
                    </d-card>
                  `
                )
              : html` Loading... `}
          </div>
          <div id="input-box">
            <d-input @input=${(e) => $comment(e.path[0].value)} .height=${"100%"}></d-input>
            <d-btn @click=${() => createComment(comment)}>Send</d-btn>
          </div>
        </div>
      `
    },
    puffin
  )

export const open = async ({ API, prNumber, options }) => {
  var provider = await getProvider({ API })
  // var panel = options.panel
  // if (!options.panel || !document.body.contains(options.panel)) {
  //     panel = panels.create({API})
  //     options.panel = panel
  // }
  // API.Tab({
  //     title:`Issue #${issueNumber}`,
  //     isEditor:false,
  //     component:component({puffin:API.puffin,provider,issueNumber}),
  //     panel,
  //     id:`github-issue-${issueNumber}:${panel.id}`
  // })
  var comp = component({ puffin: API.puffin, provider, prNumber })
  panels.openTab({
    title: `PR #${prNumber}`,
    component: comp,
    id: `github-pr-${prNumber}`,
    API,
    options,
  })
}
