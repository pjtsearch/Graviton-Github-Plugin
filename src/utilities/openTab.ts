import { createPreactComponent } from "./createComponent"
import { html } from "htm/preact"

export const openTab = ({
  API,
  comp,
  title,
  provider,
  pageArgs,
  id,
}: {
  API: any
  comp: any
  title: string
  provider: any
  pageArgs: any
  id: string
}) => {
  if (!document.body.contains(document.querySelector(`div.tabsbar > .tab${id}`))) {
    const pfncomp = createPreactComponent(
      html` <${comp} provider=${provider} hist=${null} args=${pageArgs} /> `,
      API.puffin
    )
    API.Tab({
      title: title,
      isEditor: false,
      component: pfncomp.component,
      id,
    })
    pfncomp.render()
  } else {
    document.querySelector<any>(`div.tabsbar > .tab${id}`)?.state.emit("focusedMe")
  }
}
