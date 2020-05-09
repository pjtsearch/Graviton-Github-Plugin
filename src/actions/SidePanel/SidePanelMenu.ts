import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"
import { DracButton } from "../../components/index"
import styled from "preact-css-styled"

interface MenuItem {
  onClick: () => any
  name: string
  icon: any
}

const wrapper = styled(
  "div",
  `
  {
    display:grid;
    grid-template-columns: repeat( auto-fit, minmax(30px, 1fr) );
  }
`
)

export const SidePanelMenu = ({ items }: { items: MenuItem[] }) => {
  return html`
    <${wrapper}>
      ${items.map(
        (item: MenuItem) => html`
              <${DracButton} onClick=${() => item.onClick()}><${item.icon}/></${DracButton}>
              `
      )}
    </${wrapper}>
  `
}
