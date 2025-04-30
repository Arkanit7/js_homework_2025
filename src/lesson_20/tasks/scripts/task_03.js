'use strict'

/**
 * @param {Event} e
 */
function handleInputReset({target}, resetValue = '0') {
  if (target.tagName !== 'INPUT') return

  target.value = resetValue
}

const formEl = document.querySelector('.js-form')

formEl?.addEventListener('click', (e) => handleInputReset(e))
