'use strict'

/**
 * @param {Event} e
 */
function handleInputCascade({target, currentTarget}) {
  if (!(target instanceof HTMLInputElement)) return

  const targetValue = parseFloat(target.value)

  if (!isFinite(targetValue)) return

  /** @type {NodeListOf<HTMLInputElement>} */
  const relativeInputs = currentTarget.querySelectorAll('input')
  const targetIndex = [].indexOf.call(relativeInputs, target)

  // update previous
  let previousValue = targetValue

  for (let i = targetIndex - 1; i >= 0; i--) {
    relativeInputs[i].value = String(--previousValue)
  }

  // update next
  let nextValue = targetValue

  for (let i = targetIndex + 1; i < relativeInputs.length; i++) {
    relativeInputs[i].value = String(++nextValue)
  }
}

const formEl = document.querySelector('.js-form')

formEl?.addEventListener('input', handleInputCascade)
