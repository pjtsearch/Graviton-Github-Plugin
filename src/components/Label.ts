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
}
`
)

export const Label = ({ color, children }: { color: string; children: any[] }) => {
  return html`
    <${styles} style=${`background-color:${color ? "#" + color : "transparent"};`}>
        <span style=${`color:${fontColorContrast(color)};`}>${children}</span>
    </${styles}>
    `
}
