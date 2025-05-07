'use strict'

const STORAGE_KEYS = {
  backgroundColor: 'backgroundColor',
  backgroundColorChange: 'backgroundColorChange',
}

/**
 * @param {string} color
 */
function setBackgroundColor(color) {
  document.body.style.backgroundColor = color
  localStorage.setItem(STORAGE_KEYS.backgroundColor, color)
}

function incrementColorChangeCounter() {
  const storageChangeAmount =
    sessionStorage.getItem(STORAGE_KEYS.backgroundColorChange) ?? '0'
  const incrementedChangeAmount = Number(storageChangeAmount) + 1

  sessionStorage.setItem(
    STORAGE_KEYS.backgroundColorChange,
    String(incrementedChangeAmount),
  )

  const counterEl = document.querySelector('.js-color-counter')
  counterEl.textContent = String(incrementedChangeAmount)
}

/** @param {Event} e */
function handleInputColorChange(e) {
  const color = e.currentTarget.value ?? ''

  setBackgroundColor(color)
  incrementColorChangeCounter()
}

function setBackgroundColorFromLocalStorage() {
  const color = localStorage.getItem(STORAGE_KEYS.backgroundColor) ?? ''
  document.body.style.backgroundColor = color
}

/** @param {StorageEvent} e */
function handleStorageEventForBackgroundColor(e) {
  if (e.key !== STORAGE_KEYS.backgroundColor) return

  setBackgroundColorFromLocalStorage()
}

function initColorStats() {
  const counterEl = document.querySelector('.js-color-counter')
  counterEl.textContent =
    sessionStorage.getItem(STORAGE_KEYS.backgroundColorChange) ?? '0'
}

// =============================================================================

window.addEventListener('storage', handleStorageEventForBackgroundColor)

setBackgroundColorFromLocalStorage()

const colorInputEl = document.querySelector('.js-color-input')
colorInputEl?.addEventListener('input', handleInputColorChange)

initColorStats()
