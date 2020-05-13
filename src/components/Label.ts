import styled from "preact-css-styled"
import { html } from "htm/preact"
import fontColorContrast from "../utilities/fontColorContrast"

const styles = styled(
  "span",
  `
{
  --accentColor:#0066FF;
  --secondaryColor:#EFEFEF;
  --textColor:black;
  --font:Montserrat, sans-serif;
  font-family:var(--puffinFont,var(--font));
  margin:3px;
  padding:4px;
  padding-left:9px;
  padding-right:9px;
  color:var(--puffinTextColor,var(--textColor));
  font-weight:normal;
  display: inline-block;
  border-radius:20px;
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 2px;
}
`
)

export const Label = ({ color, icon, children }: { color: string; icon?: any; children: any[] }) => {
  return html`
    <${styles} style=${`background-color:${color ? "#" + color : "transparent"};`}>
        <${icon} style=${`color:${fontColorContrast(color)};`}/>
        <span style=${`color:${fontColorContrast(color)};`}>${children}</span>
    </${styles}>
    `
}
