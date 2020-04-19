import {component} from 'haunted';

// if (puffin)
export default (name,comp,puffin)=>{
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
          document.getElementById(id).appendChild(ele)
        }
      }
    }

}
