import { SidePanel } from "../actions/index"
import { SidePanelIcon } from "../actions/SidePanel/SidePanelIcon"

export const register = ({ API }: { API: any }) => {
  const sidePanel = SidePanel({ API })
  const sidePanelIcon = SidePanelIcon({ API })
  API.SidePanel({
    icon: sidePanelIcon.component,
    panel: sidePanel.component,
  })
  sidePanel.render()
  sidePanelIcon.render()
}
