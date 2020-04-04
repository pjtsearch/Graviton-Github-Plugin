import {component} from 'haunted';

export default (puffin,name,comp)=>{
    customElements.define(name, component(comp,{useShadowDOM:true}));
    return puffin.element("<"+name+">"+"</"+name+">")
}