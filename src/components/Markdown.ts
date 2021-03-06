import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"
import DOMPurify from "dompurify"
import marked from "marked"
import highlightjs from "highlight.js"
// @ts-ignore
import styled from "preact-css-styled"

const highlightContainer = styled(
  "div",
  `

  table {
    color: var(--puffinTextColor,var(--textColor));
  }
/*
 * Visual Studio 2015 dark style
 * Author: Nicolas LLOBERA <nllobera@gmail.com>
 */

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background:  var(--bodyBackground);
  color: var(--commandPromptInputText)
  font-family:monospace;
}

.hljs-keyword,
.hljs-literal,
.hljs-symbol,
.hljs-name {
  color: #569CD6;
}
.hljs-link {
  color: #569CD6;
  text-decoration: underline;
}

.hljs-built_in,
.hljs-type {
  color: #4EC9B0;
}

.hljs-number,
.hljs-class {
  color: #B8D7A3;
}

.hljs-string,
.hljs-meta-string {
  color: #D69D85;
}

.hljs-regexp,
.hljs-template-tag {
  color: #9A5334;
}

.hljs-subst,
.hljs-function,
.hljs-title,
.hljs-params,
.hljs-formula {
  color: #DCDCDC;
}

.hljs-comment,
.hljs-quote {
  color: #57A64A;
  font-style: italic;
}

.hljs-doctag {
  color: #608B4E;
}

.hljs-meta,
.hljs-meta-keyword,
.hljs-tag {
  color: #9B9B9B;
}

.hljs-variable,
.hljs-template-variable {
  color: #BD63C5;
}

.hljs-attr,
.hljs-attribute,
.hljs-builtin-name {
  color: #9CDCFE;
}

.hljs-section {
  color: gold;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

/*.hljs-code {
  font-family:'Monospace';
}*/

.hljs-bullet,
.hljs-selector-tag,
.hljs-selector-id,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo {
  color: #D7BA7D;
}

.hljs-addition {
  background-color: #144212;
  display: inline-block;
  width: 100%;
}

.hljs-deletion {
  background-color: #600;
  display: inline-block;
  width: 100%;
}
`
)

export const Markdown = ({ text }: { text: any }) => {
  useEffect(() => {
    const renderer = new marked.Renderer()
    renderer.code = (code, language) => {
      const highlighted = highlightjs.highlightAuto(code).value
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
    }

    marked.setOptions({
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
      renderer,
    })
  }, [])
  const [res] = useState(DOMPurify.sanitize(marked(text || "")))

  return html`
    <${highlightContainer}>
      <div dangerouslySetInnerHTML=${{ __html: res }} />
    </${highlightContainer}>
  `
}
