import { render } from "preact"

export const createPreactComponent = (comp: any, puffin: any) => {
  var id = Math.random().toString()

  return {
    component: () => puffin.element`<div id="${id}" style="width:100%"></div>`,
    render: () => {
      const htmlRef = document.getElementById(id)
      console.log(comp, htmlRef)
      if (htmlRef) render(comp, htmlRef)
    },
  }
}
