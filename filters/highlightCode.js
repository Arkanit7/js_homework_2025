import { createHighlighter } from 'shiki'

// Initialize Shiki and store the highlighter
let highlighter

async function initShiki() {
  highlighter = await createHighlighter({
    themes: ['material-theme-ocean'],
    langs: ['javascript'],
  })
}

// Custom synchronous filter for Pug
function highlightCode(text, options = {}) {
  if (!highlighter) {
    console.warn('Shiki highlighter not initialized yet!')

    return text
  }

  const {
    lang = 'text',
    theme = 'material-theme-ocean',
    inline = false,
  } = options

  let highlighted = highlighter.codeToHtml(text, { theme, lang })

  if (inline) {
    highlighted = highlighted
      .replace(/<code[^>]*>/, '') // Remove `<code>` tag
      .replace(/<\/code>/, '') // Remove closing `</code>`
      .replace('pre', 'code')
      .replace(/<\/pre>/, '</code>') // Remove closing `</code>`
  }

  return highlighted
}

initShiki()

export default highlightCode
