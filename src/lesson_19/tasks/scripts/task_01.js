'use strict'

/** @param {Event} e */
function paintNextElement({target, currentTarget}) {
  // prevent container from triggering the event
  if (currentTarget === target) return

  // reset colors
  for (const child of currentTarget.children) {
    child.style.color = ''
  }

  let nextEl = target.nextElementSibling

  while (nextEl) {
    nextEl.style.color = 'red'
    nextEl = nextEl.nextElementSibling
  }
}

const divContainer = document.querySelector('.js-app')

divContainer?.addEventListener('click', paintNextElement)
