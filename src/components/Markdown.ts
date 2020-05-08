import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"
import marked from "marked"
import DOMPurify from "dompurify"

export const Markdown = ({ text }: { text: any }) => {
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
    })
  }, [])
  const [res] = useState(DOMPurify.sanitize(marked(text || "")))

  return html`
    <div>
      <div dangerouslySetInnerHTML=${{ __html: res }} />
    </div>
  `
}
