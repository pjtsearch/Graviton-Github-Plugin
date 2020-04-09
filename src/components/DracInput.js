import {
    html,
    component,
    useLayoutEffect,
  } from 'haunted';

  const styles = vars => `
input{
  background:var(--inputBackground);
  outline: none;
  border-radius:4px;
  padding:6px;
  border:0px;
  color:var(--inputText);
}
  `
  customElements.define("d-input", component(function({
    value=""
  }){
    return html`
      <style>${styles()}</style>
      <input 
      value=${value}
      />
    `
  },{useShadowDOM:true}));
