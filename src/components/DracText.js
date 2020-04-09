import {
    html,
    component,
    useLayoutEffect,
  } from 'haunted';

  const styles = vars => `
p,span{
    --accentColor:#0066FF;
    --secondaryColor:#EFEFEF;
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
    font-weight:normal;
}
  `
  customElements.define("d-txt", component(({inline=false})=>{
      return html`
        <style>${styles()}</style>
        ${inline ?
         html`<span><slot></slot></span>`
         :
         html` <p><slot></slot></p>`
        }
      `
  },{useShadowDOM:true}));
