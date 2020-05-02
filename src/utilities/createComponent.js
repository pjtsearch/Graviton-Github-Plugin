import {component} from 'haunted';
import { render } from 'preact';

// if (puffin)
export const createComponent = (name,comp,puffin)=>{
    if (!customElements.get(name)){
        customElements.define(name, component(comp,{useShadowDOM:true}));
    }
    // if (puffin) return puffin.element("<"+name+">"+"</"+name+">")
    // FIXME: Update when Puffin updated in Graviton

    if (puffin) {
      var id = name

      return {
        component:()=>puffin.element`<div id="${id}" style="width:100%"></div>`,
        render:()=>{
          var ele = document.createElement(name)
          console.log(id,ele)
          document.getElementById(id).appendChild(ele)
        }
      }
    }

}

export const createPreactComponent = (comp,puffin)=>{
  var id = Math.random()

  return {
    component:()=>puffin.element`<div id="${id}" style="width:100%"></div>`,
    render:()=>{
      console.log(comp,document.getElementById(id))
      render(comp,document.getElementById(id))
    }
  }
}