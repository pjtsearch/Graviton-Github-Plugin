import styled from "preact-css-styled"
import { html } from "htm/preact"

const styles = styled(
  "div",
  `
{
    --font:Montserrat, sans-serif;
    --accentColor:#0066FF;
    --cardBackground:#EFEFEF;
    --disabledColor:#D8D8D8;
    --textColor:black;
    --puffinCardBackground:var(--explorerItemSelectedBackground);
    transition:0.1s;
    font-family:var(--puffinFont,var(--font));
    padding:10px 20px;
    min-height:30px;
    min-width:30px;
    /*max-width:300px;*/
    /*max-height:300px;*/
    background:var(--puffinCardBackground,var(--cardBackground));
    border:0;
    outline:0;
    box-shadow:0px 0px 0px 0px rgba(0,0,0,0) ,0 0 0 0px var(--puffinAccent,var(--accentColor));
    margin:5px;
    border-radius:5px;
    color:var(--puffinTextColor,var(--textColor));
    box-sizing: border-box;
    display:inline-block;
    overflow:auto;
}
:host.clickable:hover:not(:active){
    cursor:pointer;
    transition:0.1s;
    box-shadow:0px 1px 5px 2px rgba(0,0,0,.05) ,0 0 0 0px var(--puffinAccent,var(--accentColor));
}
:host.clickable:active{
    border:0;
    outline:0;
    box-sizing: border-box;
    box-shadow:0px 1px 5px 3px rgba(0,0,0,.05) ,0 0 0 3px var(--puffinAccent,var(--accentColor));
}
:host.clickable.active{
    border:0;
    outline:0;
    box-sizing: border-box;
    box-shadow:0px 1px 5px 3px rgba(0,0,0,.05) ,0 0 0 3px var(--puffinAccent,var(--accentColor));
}
:host.disabled{
    pointer-events: none;
    /*background:var(--puffinDisabledColor,var(--disabledColor));*/
}
`
)

export const DracCard = ({
  width = "auto",
  children,
  onclick,
  clickable = false,
}: {
  width: string | number
  children: any[]
  onclick?: Function
  clickable: boolean
}) => {
  return html`
      <${styles} style="${`width:${width};`}" class="${onclick ? "clickable" : ""}" onclick=${() =>
    onclick ? onclick() : null}>
        ${children}
      </${styles}>
    `
}
