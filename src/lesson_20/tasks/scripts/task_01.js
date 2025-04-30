'use strict'

function getRandomInteger(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number')
    throw new TypeError('Min and max values must be numbers.')

  return min + Math.floor(Math.random() * (max - min + 1))
}

class Star {
  imgUrl
  options
  intervalId
  #leftPx
  #topPx
  #sizePx

  constructor(imgUrl, options = {}) {
    this.imgUrl = imgUrl
    this.options = {
      cssClass: 'star',
      minSizePx: 20,
      maxSizePx: 60,
      sizeStepPx: 25,
      intervalMs: 300,
      ...options,
    }
  }

  get sizePx() {
    return this.#sizePx
  }

  set sizePx(newSizePx) {
    this.#sizePx = newSizePx
    this.$el.style.inlineSize = newSizePx + 'px'
  }

  get leftPx() {
    return this.#leftPx
  }

  set leftPx(newLeftPx) {
    this.#leftPx = newLeftPx
    this.$el.style.left = newLeftPx + 'px'
  }

  get topPx() {
    return this.#topPx
  }

  set topPx(newTopPx) {
    this.#topPx = newTopPx
    this.$el.style.top = newTopPx + 'px'
  }

  setRandomPosition() {
    this.leftPx =
      this.options.maxSizePx / 2 +
      Math.random() *
        (document.documentElement.clientWidth - this.options.maxSizePx)
    this.topPx =
      this.options.maxSizePx / 2 +
      Math.random() *
        (document.documentElement.clientHeight - this.options.maxSizePx)
  }

  resetSizePosition() {
    this.sizePx = this.options.minSizePx
    this.setRandomPosition()
  }

  run() {
    if (this.intervalId) return

    let isAboutToVanish = false

    this.intervalId = setInterval(() => {
      this.$el.style.opacity = ''
      this.sizePx += this.options.sizeStepPx

      if (isAboutToVanish) {
        this.$el.style.opacity = '0'
        isAboutToVanish = false
        this.resetSizePosition()
        return
      }

      if (this.sizePx >= this.options.maxSizePx) {
        this.$el.style.opacity = '0'
        isAboutToVanish = true
      }
      // just before the last tick, start to dim the star
    }, this.options.intervalMs)
  }

  stop() {
    if (!this.intervalId) return

    clearInterval(this.intervalId)
    this.intervalId = null
  }

  render(selector) {
    /** @type {HTMLImageElement} */
    this.$el = document.createElement('IMG')
    this.$el.src = this.imgUrl
    this.$el.alt = 'Зірка'
    this.$el.className = this.options.cssClass
    this.$el.style.transitionDuration = this.options.intervalMs + 'ms'
    this.$el.style.opacity = '0'
    this.resetSizePosition()
    this.run()

    if (selector) document.querySelector(selector).append(this.$el)

    return this.$el
  }

  remove() {
    this.stop()
    this.$el.remove()
  }
}

class StarSky {
  stars = []
  selector
  options

  constructor(selector, options = {}) {
    this.selector = selector
    this.options = {
      cssClass: 'star',
      minSizePx: 10,
      maxSizePx: 40,
      minSizeStepPx: 10,
      maxSizeStepPx: 20,
      minIntervalMs: 500,
      maxIntervalMs: 800,
      ...options,
    }
  }

  create(starAmount) {
    if (typeof starAmount !== 'number')
      throw new TypeError('Min and max values must be numbers.')
    if (starAmount < 1) throw new RangeError('Stars amount must be positive.')

    this.stars = Array.from(
      {length: starAmount},
      () =>
        new Star('./images/star-eastern.svg', {
          cssClass: this.options.cssClass,
          minSizePx: this.options.minSizePx,
          maxSizePx: this.options.maxSizePx,
          sizeStepPx: getRandomInteger(
            this.options.minSizeStepPx,
            this.options.maxSizeStepPx,
          ),
          intervalMs: getRandomInteger(
            this.options.minIntervalMs,
            this.options.maxIntervalMs,
          ),
        }),
    )
  }

  render() {
    for (const star of this.stars) {
      star.render(this.selector)
    }
  }

  clear() {
    for (const star of this.stars) {
      star.remove()
    }
  }
}

// =============================================================================

try {
  const starlight = new StarSky('.js-stars')

  /** @param {SubmitEvent} e */
  function handleStars(e) {
    e.preventDefault()

    const starsAmount = parseFloat(
      e.currentTarget.querySelector('.js-stars-amount').value,
    )

    starlight.clear()
    starlight.create(starsAmount)
    starlight.render()
  }

  const starForm = document.querySelector('.js-stars-form')

  starForm.addEventListener('submit', handleStars)
} catch (error) {
  console.error(error)
}
