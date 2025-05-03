'use strict'

class TimeOnPage {
  visitTimestamp = Date.now()
  intervalS
  intervalId
  className

  /**
   * @param {string} cssSelector
   */
  constructor(cssSelector, intervalS = 1, className = '') {
    this.intervalS = intervalS
    this.className = className
    this.render(cssSelector)
  }

  get time() {
    return Date.now() - this.visitTimestamp
  }

  get seconds() {
    return Math.floor(this.time / 1e3) % 60
  }

  get minutes() {
    return Math.floor(this.time / (60 * 1e3))
  }

  getFormattedTime() {
    const h = this.minutes.toString().padStart(2, '0')
    const s = this.seconds.toString().padStart(2, '0')

    return `${h}:${s}`
  }

  updateUI() {
    this.$el.textContent = this.getFormattedTime()
  }

  start() {
    if (this.intervalId) return

    this.updateUI()

    this.intervalId = setInterval(() => {
      this.updateUI()
    }, this.intervalS * 1000)
  }

  stop() {
    if (!this.intervalId) return

    this.intervalId = void clearInterval(this.intervalId)
  }

  /**
   * @param {string} cssSelector
   */
  render(cssSelector) {
    this.$el = document.createElement('p')
    this.$el.className = this.className

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

// =============================================================================

const userSpentTime = new TimeOnPage(
  '.js-app',
  1,
  'u-min-is-3200 u-p-200 u-rounded-full u-bg-natural-400 u-text-500 u-font-bolder u-inline-grid u-place-content-center u-aspect-square u-border-4',
)
userSpentTime.start()
