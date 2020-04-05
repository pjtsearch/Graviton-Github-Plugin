import {component} from 'haunted';

// if (puffin)
export default (name,comp,puffin)=>{
    if (!customElements.get(name)){
        customElements.define(name, component(comp,{useShadowDOM:true}));
    }
    if (puffin) return puffin.element("<"+name+">"+"</"+name+">")
}