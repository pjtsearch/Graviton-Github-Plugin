import { Markdown } from "../../components/Markdown"
import { DracText, DracCard, DracInput, DracTitle, DracButton } from "../../components/index"
import { html } from "htm/preact"
import { Comment } from "../../providers/types"
const shell = require("electron").shell

export const CommentCard = ({ comment }: { comment: Comment }) => {
  return html`
    <${DracCard} width=${"calc(100% - 10px)"}>
        <a onClick=${() => shell.openExternal(comment.creator.url)} href="#" style=${{ textDecoration: "none" }}>
            <img height="20" src=${comment.creator.avatar}/>
            <${DracText} inline=${true}>${comment.creator.login}</${DracText}>
        </a>
        <br/>
        <${Markdown} text=${comment.body}></${Markdown}>
    </${DracCard}>
    `
}
