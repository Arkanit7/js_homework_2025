'use strict'

class Countdown {
  intervalId
  $el
  countdownEl
  options

  constructor(cssSelector, options = {}) {
    this.options = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervalS: 1,
      className: {
        base: '',
        target: '',
        countdown: '',
      },
      ...options,
    }

    this.render(cssSelector)
    this.start()
  }

  /**
   * @param {number} hours
   * @param {number} minutes
   */
  getCountdown(hours, minutes = 0, seconds = 0) {
    const then = new Date()
    then.setHours(hours, minutes, seconds)

    const now = new Date()

    if (now > then) then.setHours(hours + 24)

    const differenceMs = then.getTime() - now.getTime()

    return {
      seconds: Math.floor(differenceMs / 1e3) % 60,
      minutes: Math.floor(differenceMs / (1e3 * 60)) % 60,
      hours: Math.floor(differenceMs / (1e3 * 60 * 60)),
    }
  }

  formatTimeUnit(unit) {
    return String(unit).padStart(2, '0')
  }

  updateUI() {
    const {hours, minutes, seconds} = this.getCountdown(
      this.options.hours,
      this.options.minutes,
      this.options.seconds,
    )

    this.countdownEl.textContent = `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`

    // If the timer expires, stop
    if (hours === 0 && minutes === 0 && seconds === 0) {
      this.stop()
      this.countdownEl.textContent = '00:00:00'
    }
  }

  start() {
    if (this.intervalId) return

    this.updateUI()

    this.intervalId = setInterval(() => {
      this.updateUI()
    }, this.options.intervalS * 1e3)
  }

  stop() {
    if (!this.intervalId) return

    clearInterval(this.intervalId)
    this.intervalId = null
  }

  render(cssSelector) {
    const targetTimeEl = document.createElement('P')
    targetTimeEl.className = this.options.className.target
    targetTimeEl.textContent = `${this.formatTimeUnit(this.options.hours)}:${this.formatTimeUnit(this.options.minutes)}:${this.formatTimeUnit(this.options.seconds)}`

    this.countdownEl = document.createElement('P')
    this.countdownEl.className = this.options.className.countdown

    this.$el = document.createElement('DIV')
    this.$el.className = this.options.className.base
    this.$el.append(this.countdownEl, targetTimeEl)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

// =============================================================================

new Countdown('.js-app', {
  hours: 8,
  intervalS: 1,
  className: {
    base: 'u-min-is-3200 u-p-400 u-rounded-full u-bg-natural-400 u-font-bolder u-inline-grid u-place-content-center u-aspect-square u-border-4 u-text-center',
    target: 'u-text-250',
    countdown: 'u-text-500',
  },
})

const now = new Date()
now.setSeconds(now.getSeconds() + 10)

new Countdown('.js-app', {
  hours: now.getHours(),
  minutes: now.getMinutes(),
  seconds: now.getSeconds(),
  intervalS: 1,
  className: {
    base: 'u-min-is-3200 u-p-400 u-rounded-full u-bg-natural-400 u-font-bolder u-inline-grid u-place-content-center u-aspect-square u-border-4 u-text-center',
    target: 'u-text-250',
    countdown: 'u-text-500',
  },
})
