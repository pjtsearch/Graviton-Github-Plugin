import {
    html,
    component,
    useLayoutEffect,
  } from 'haunted';

  const styles = vars => `
h1{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:10px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
h2{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:8px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
h3{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
h4{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
h5{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
h6{
    --textColor:black;
    --font:Montserrat, sans-serif;
    font-family:var(--puffinFont,var(--font));
    margin:3px;
    margin-bottom:6px; 
    padding:5px;
    color:var(--puffinTextColor,var(--textColor));
}
  `
  customElements.define("d-title", component(({level=1})=>{
      return html`
        <style>${styles()}</style>
        ${level === 1 ? html`<h1><slot></slot></h1>`:null}
        ${level === 2 ? html`<h2><slot></slot></h2>`:null}
        ${level === 3 ? html`<h3><slot></slot></h3>`:null}
        ${level === 4 ? html`<h4><slot></slot></h4>`:null}
        ${level === 5 ? html`<h5><slot></slot></h5>`:null}
        ${level === 6 ? html`<h6><slot></slot></h6>`:null}
      `
  },{useShadowDOM:true}));
