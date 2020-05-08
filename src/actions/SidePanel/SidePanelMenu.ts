import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"
import { DracButton } from "../../components/index"

interface MenuItem {
    onClick:()=>any
    name:string
}

export const SidePanelMenu = ({items}:{items:MenuItem[]})=>{
    return html`
        ${items.map(
            (item:MenuItem) => html`
            <${DracButton} onClick=${() => item.onClick()}>${item.name}</${DracButton}>
            `
        )}
    `
}