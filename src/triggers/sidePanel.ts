import { SidePanel } from "../actions/index"

export const register = ({ API, options }:{ API:any, options:any }) => {
  const sidePanel = SidePanel({ API })
  API.SidePanel({
    icon: () => API.puffin.element`<span style="color:white">G</span>`,
    panel: sidePanel.component,
  })
  sidePanel.render()
}
