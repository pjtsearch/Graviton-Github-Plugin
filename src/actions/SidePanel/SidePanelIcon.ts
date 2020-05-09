import { html } from "htm/preact"
import { createPreactComponent } from "../../utilities/createComponent"

import GithubIcon from "mdi-preact/GithubIcon"

const Comp = () => {
  return html` <${GithubIcon} style=${{ color: "var(--puffinTextColor,var(--textColor))", width: "100%" }} /> `
}

export const SidePanelIcon = ({ API }: { API: { puffin: any } }) =>
  createPreactComponent(html` <${Comp} /> `, API.puffin)
