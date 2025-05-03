/**
 * @param {string} text
 */
function escape(text) {
  text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default escape
