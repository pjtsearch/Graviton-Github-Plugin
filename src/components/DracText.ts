import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"
import styled from "preact-css-styled"

const p = styled(
  "p",
  `
{
  --accentColor:#0066FF;
    --secondaryColor:#EFEFEF;
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
    font-weight:normal;
}
`
)

const span = styled(
  "span",
  `
{
  --accentColor:#0066FF;
    --secondaryColor:#EFEFEF;
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
    font-weight:normal;
}
`
)

export const DracText = ({ inline = false, children }: { inline: boolean; children: any[] }) => {
  return html` ${inline ? html`<${span}>${children}</${span}>` : html` <${p}>${children}</${p}>`} `
}
