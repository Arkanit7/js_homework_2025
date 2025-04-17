'use strict'

function initExchanger(rates) {
  const giveEl = document.querySelector('.js-give')
  const receiveEl = document.querySelector('.js-receive')
  const giveCurrencyEl = document.querySelector('.js-give-currency')
  const receiveCurrencyEl = document.querySelector('.js-receive-currency')
  const swapBtn = document.querySelector('.js-swap-rates')

  if (
    !giveEl ||
    !receiveEl ||
    !giveCurrencyEl ||
    !receiveCurrencyEl ||
    !swapBtn
  )
    return

  const handleGiveInput = () => {
    const giveCurrency = giveCurrencyEl.value
    const receiveCurrency = receiveCurrencyEl.value
    const receiveVal = giveEl.value * rates[giveCurrency][receiveCurrency]

    receiveEl.value = receiveVal.toFixed(2)
  }

  giveCurrencyEl.addEventListener('input', handleGiveInput)
  receiveCurrencyEl.addEventListener('input', handleGiveInput)
  giveEl.addEventListener('input', handleGiveInput)

  receiveEl.addEventListener('input', () => {
    const giveCurrency = giveCurrencyEl.value
    const receiveCurrency = receiveCurrencyEl.value
    const giveVal = receiveEl.value / rates[giveCurrency][receiveCurrency]

    giveEl.value = giveVal.toFixed(2)
  })

  swapBtn.addEventListener('click', () => {
    ;[giveCurrencyEl.value, receiveCurrencyEl.value] = [
      receiveCurrencyEl.value,
      giveCurrencyEl.value,
    ]
    ;[giveEl.value, receiveEl.value] = [receiveEl.value, giveEl.value]
    handleGiveInput()
  })
}

// =============================================================================

const rates = {
  uah: {
    uah: 1,
    usd: 0.024,
    eur: 0.021,
  },
  usd: {
    usd: 1,
    uah: 40.7,
    eur: 0.88,
  },
  eur: {
    eur: 1,
    usd: 1.13,
    uah: 47.01,
  },
}

initExchanger(rates)
