/**
 * @param {string} text
 */
function escape(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default escape
