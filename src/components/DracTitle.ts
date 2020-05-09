import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"
import styled from "preact-css-styled"

const h1 = styled(
  "h1",
  `
{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:10px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
`
)

const h2 = styled(
  "h2",
  `
{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:8px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
`
)

const h3 = styled(
  "h3",
  `
{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
`
)

const h4 = styled(
  "h4",
  `
{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
`
)

const h5 = styled(
  "h5",
  `
{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
`
)

const h6 = styled(
  "h6",
  `
{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
`
)

export const DracTitle = ({ level = 1, children }: { level: number; children: any[] }) => {
  return html`
    ${level === 1 ? html`<${h1}>${children}</${h1}>` : null} ${level === 2 ? html`<${h2}>${children}</${h2}>` : null}
    ${level === 3 ? html`<${h3}>${children}</${h3}>` : null} ${level === 4 ? html`<${h4}>${children}</${h4}>` : null}
    ${level === 5 ? html`<${h5}>${children}</${h5}>` : null} ${level === 6 ? html`<${h6}>${children}</${h6}>` : null}
  `
}
