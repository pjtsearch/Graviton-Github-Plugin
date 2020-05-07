// import * as HomeMenu from "../actions/HomeMenu"
import * as panels from "../utilities/panels"

export const register = ({ API, options }) => {
  new API.StatusBarItem({
    label: "Github",
    action() {
      panels.toggle({ API, options })
    },
    component: () => API.puffin.element`<span>Github</span>`,
    position: "right",
  })
}
