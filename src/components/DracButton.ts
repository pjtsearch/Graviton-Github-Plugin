import styled from "preact-css-styled";

export const DracButton = styled("button",`
    {
        --font:Montserrat, sans-serif;
        --accentColor:#0066FF;
        --buttonBackground:#EFEFEF;
        --disabledColor:#D8D8D8;
        --textColor:black;
        transition:0.1s;
        font-family:var(--puffinFont,var(--font));
        padding:10px 20px;
        background:var(--puffinButtonBackground,var(--buttonBackground));
        border:0;
        outline:0;
        text-transform: uppercase;
        box-shadow:0px 0px 0px 0px rgba(0,0,0,0) ,0 0 0 0px var(--puffinAccent,var(--accentColor)); 
        margin:5px;
        border-radius:5px;
        color:var(--puffinTextColor,var(--textColor));
        font-size:13px;
    }
    :host:hover:not(:active){
        cursor:pointer;
        transition:0.1s;
        box-shadow:0px 1px 5px 2px rgba(0,0,0,.05) ,0 0 0 0px var(--puffinAccent,var(--accentColor));  
    }
    :host:active{
        border:0;
        outline:0;
        box-sizing: border-box;
        box-shadow:0px 1px 5px 3px rgba(0,0,0,.05) ,0 0 0 3px var(--puffinAccent,var(--accentColor));  
    }
    :host.disabled{
        pointer-events: none;
        background:var(--puffinDisabledColor,var(--disabledColor));
    }
  `)