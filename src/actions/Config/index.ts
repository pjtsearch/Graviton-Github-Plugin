import { html } from "htm/preact"
import { createPreactComponent } from "../../utilities/createComponent"
import { useState, useEffect } from "preact/hooks"

import { DracButton, DracText, DracInput, DracTitle } from "../../components/index"
import styled from "preact-css-styled"
import { PageHistory } from "../../utilities/PageHistory"
import getProvider from "../../utilities/getProvider"

const styles = styled(
  "div",
  `
{
  width:100%;
  margin:10px;
}
.field{
  display:block;
}
.field > *{
  display:inline-block;
}
`
)

export const Config = ({
  API,
  provider,
  hist,
  args: { $provider },
}: {
  API: any
  provider: any
  hist: PageHistory
  args?: any
}) => {
  const [form, setForm] = useState({
    auth: API.StaticConfig.data.github.auth,
  })
  const submit = async (form: any) => {
    API.StaticConfig.data.github = { ...API.StaticConfig.data.github, ...form }
    $provider(await getProvider({ API }))
  }
  return html`
    <${styles}>
      <${DracTitle}>Config</${DracTitle}>
      <div class="field">
        <${DracText}>Auth:</${DracText}>
        <${DracInput} onInput=${(e: any) => setForm({ ...form, auth: e.path[0].value })} value=${
    API.StaticConfig.data.github.auth
  }/>
      </div>
      <${DracButton} onClick=${() => submit(form)}>Save</${DracButton}>
    </${styles}>
  `
}
