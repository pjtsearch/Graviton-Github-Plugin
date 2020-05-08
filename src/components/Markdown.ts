import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"
import marked from 'marked';

export const Markdown = ({text}:{text:any})=>{
    useEffect(()=>{
        marked.setOptions({
            gfm: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
          });      
    },[])
    const [res] = useState(marked(text || ''));

    return html`
    <div>
        <div dangerouslySetInnerHTML=${{__html: res}} />
    </div>
    `
}