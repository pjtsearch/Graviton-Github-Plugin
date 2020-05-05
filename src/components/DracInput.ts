import { html } from "htm/preact"
import { useState, useEffect } from "preact/hooks"
import styled from "preact-css-styled"

const styles = styled(
  "input",
  `
{
  background:var(--inputBackground);
  outline: none;
  border-radius:4px;
  padding:6px;
  border:0px;
  color:var(--inputText);
  width: 100%;
  height: auto;
}
  `
)

export const DracInput = ({ height = "auto", onInput = (e: any) => {} }) => {
  return html`
    <${styles} style=${`height:${height}`} onInput=${(e: any) => onInput(e)} />
  `
}
