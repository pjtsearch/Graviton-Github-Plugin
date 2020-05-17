import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { DracText, DracCard, DracInput, DracTitle, DracButton } from "../../components/index"
import styled from "preact-css-styled"
import { PageHistory } from "../../utilities/PageHistory"
import { Markdown } from "../../components/Markdown"

import ArrowLeftIcon from "mdi-preact/ArrowLeftIcon"
import { Label } from "../../components/Label"
import { CommentCard } from "./CommentCard"
import { Provider } from "../../providers/Provider"
import * as types from "../../providers/types"

import AlertCircleOutlineIcon from "mdi-preact/AlertCircleOutlineIcon"
import AlertCircleCheckOutlineIcon from "mdi-preact/AlertCircleCheckOutlineIcon"

const shell = require("electron").shell

const styles = styled(
  "div",
  `
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
  grid-template-columns: 1fr auto auto;
  position:absolute;
  bottom:4px;
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
  height: calc(100% - 0px);
  padding-bottom:50px;
  box-sizing: border-box;
  max-width: 700px;
  margin: auto;
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
)

export const Issue = ({
  provider: { deps, repo, provider },
  hist,
  args: { number: issueNumber, pr },
}: {
  // TODO: fix types
  provider: { deps: any; repo: any; provider: any }
  hist?: PageHistory
  args?: any
  pr: boolean
}) => {
  let [comments, $comments]: any[] = useState([])
  let [issue, $issue]: any[] = useState({})
  let [user, $user]: any[] = useState({})
  let [comment, $comment] = useState("")
  let [loading, $loading]: [boolean, any] = useState(true)

  const update = async () => {
    $loading(true)
    //TODO: re-add
    // $user(await provider.getUserInfo())
    if (!pr) {
      console.log(deps, repo, provider)
      await Promise.all([
        $issue(await new provider.Issue(deps).fromFetch({ repo, issueNumber })),
        // $comments(await provider.getIssueComments({ issueNumber })),
      ])
    } else if (pr) {
      await Promise.all([
        $issue(await provider.getPullRequest({ prNumber: issueNumber })),
        $comments(await provider.getPullRequestComments({ prNumber: issueNumber })),
      ])
    }
    $loading(false)
  }

  useEffect(() => {
    update()
  }, [])

  const createComment = async (body: string) => {
    console.log(await provider.createComment({ issueNumber, body }))
    await update()
  }

  const close = async () => {
    console.log(await provider.closeIssue({ issueNumber }))
    await update()
  }
  return html`
        <${styles} id="issue">
            <div id="issue-wrapper">
              ${
                !loading
                  ? html`
                <${DracTitle} style=${{ display: "inline" }} level=${2}>${issue.title}</${DracTitle}>
                <${Label} color=${issue.state === "open" ? "4caf50" : "f44336"} icon=${
                      issue.state === "open" ? AlertCircleOutlineIcon : AlertCircleCheckOutlineIcon
                    }>${issue.state === "open" ? "Opened" : "Closed"}</${Label}>
                <${CommentCard} comment=${issue}/>
                `
                  : html` <${DracText}>Loading...</${DracText}> `
              }
              ${!loading ? comments.map((comment: any) => html` <${CommentCard} comment=${comment} /> `) : null}
            </div>
            <div id="input-box">
              <${DracInput} onInput=${(e: any) => $comment(e.target.value)} height=${"100%"}></${DracInput}>
              <${DracButton} onClick=${() => createComment(comment)}>Send</${DracButton}>
              ${
                !loading &&
                issue.state === "open" &&
                (user.login === issue.owner || user.login === provider.repo.owner) &&
                html`<${DracButton} onClick=${() => close()}>Close</${DracButton}>`
              }
            </div>
        </${styles}>
    `
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
