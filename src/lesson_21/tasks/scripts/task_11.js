'use strict'

// ## ❌ Flaws
// 1. Time doesn't account for daylight saving time

class Clock {
  cssSelector
  options
  intervalId
  $el
  timeEl

  /**
   * @param {string} cssSelector
   * @param {Object} options
   */
  constructor(cssSelector, options = {}) {
    this.cssSelector = cssSelector
    this.options = {
      label: 'Time',
      timeZoneOffsetM: 0,
      cssClasses: {
        base: '',
        label: '',
        timeZone: '',
        time: '',
      },
      ...options,
    }

    this.init()
  }

  getDateNow() {
    const startDate = new Date()
    const localTimeOffsetM = startDate.getTimezoneOffset()

    startDate.setMinutes(
      startDate.getMinutes() + localTimeOffsetM + this.options.timeZoneOffsetM,
    )

    return startDate
  }

  updateUI() {
    this.timeEl.textContent = this.getDateNow().toLocaleTimeString('uk-UA')
  }

  start() {
    if (this.intervalId) return

    this.updateUI()

    this.intervalId = setInterval(() => {
      this.updateUI()
    }, 1000)
  }

  stop() {
    if (!this.intervalId) return

    this.intervalId = void clearInterval(this.intervalId)
  }

  render() {
    const labelEl = document.createElement('P')
    labelEl.textContent = this.options.label
    labelEl.className = this.options.cssClasses.label

    const timeZoneEl = document.createElement('P')
    timeZoneEl.className = this.options.cssClasses.timeZone
    const UTCOffset = this.options.timeZoneOffsetM / 60
    const isPositive = UTCOffset >= 0
    timeZoneEl.textContent = `UTC${isPositive ? '+' : ''}` + UTCOffset

    this.timeEl = document.createElement('P')
    this.timeEl.textContent = this.timeEl.className =
      this.options.cssClasses.time

    this.$el = document.createElement('DIV')
    this.$el.append(labelEl, timeZoneEl, this.timeEl)
    this.$el.className = this.options.cssClasses.base

    document.querySelector(this.cssSelector).append(this.$el)
  }

  init() {
    this.render()
    this.start()
  }
}

// =============================================================================

const cssClasses = {
  base: 'u-min-is-3600 u-p-600 u-rounded-full u-bg-natural-400 u-font-bolder u-inline-grid u-gap-100 u-place-content-center u-aspect-square u-border-4 u-text-center',
  label: '',
  time: 'u-text-450',
  timeZone: 'u-text-200',
}

new Clock('.js-app', {
  timeZoneOffsetM: 60,
  label: 'Лондон',
  cssClasses,
})

new Clock('.js-app', {
  timeZoneOffsetM: 120,
  label: 'Париж',
  cssClasses,
})

new Clock('.js-app', {
  timeZoneOffsetM: 10 * 60,
  label: 'Сідней',
  cssClasses,
})
new Clock('.js-app', {
  timeZoneOffsetM: -4 * 60,
  label: 'Вашингтон',
  cssClasses,
})
new Clock('.js-app', {
  timeZoneOffsetM: 5.5 * 60,
  label: 'Мумбаї',
  cssClasses,
})
