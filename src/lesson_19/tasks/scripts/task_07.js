'use strict'

/**
 * @param {number} from
 * @param {number} to
 * @returns {number}
 * @throws {TypeError}
 */
function getRandomInteger(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number')
    throw TypeError('Range must be set in numbers.')

  return from + Math.floor(Math.random() * (to - from + 1))
}

class ColorHSL {
  /**
   * @param {number} hue
   * @param {number} saturation
   * @param {number} lightness
   */
  constructor(hue, saturation, lightness) {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
  }

  toString() {
    return `hsl(${this.hue}deg ${this.saturation}% ${this.lightness}%)`
  }
}

class Snowflake {
  static template = document.querySelector('.js-snowflake-template')
  static intervalMs = 300
  static minSize = 36
  static maxSize = 72
  static minHue = 190
  static maxHue = 210
  static minSaturation = 30
  static maxSaturation = 80
  static minLightness = 70
  static maxLightness = 90
  static minSpeed = 15
  static maxSpeed = 80

  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.intervalId = null
    this.size = getRandomInteger(Snowflake.minSize, Snowflake.maxSize)
    this.element = this.#createEl()
    this.#initializePositionAndColor()
    this.#applyInitialStyles()
    container.append(this.element)
  }

  get availableWidth() {
    return document.documentElement.clientWidth - this.size
  }

  get availableHeight() {
    return document.documentElement.clientHeight + 2 * this.size
  }

  #createEl() {
    /** @type {HTMLElement}  */
    const snowflakeEl =
      Snowflake.template.content.firstElementChild.cloneNode(true)

    return snowflakeEl
  }

  #initializePositionAndColor() {
    this.top = -this.size
    this.left = getRandomInteger(0, this.availableWidth)
    this.color = new ColorHSL(
      getRandomInteger(Snowflake.minHue, Snowflake.maxHue),
      getRandomInteger(Snowflake.minSaturation, Snowflake.maxSaturation),
      getRandomInteger(Snowflake.minLightness, Snowflake.maxLightness),
    )

    this.speed = getRandomInteger(Snowflake.minSpeed, Snowflake.maxSpeed)
  }

  #applyInitialStyles() {
    this.element.style.top = -this.size + 'px'
    this.element.style.left = this.left + 'px'
    this.element.style.color = String(this.color)

    this.element.style.inlineSize = this.size + 'px'
    this.element.style.translate = `0 ${this.top}px`
  }

  fall() {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      this.top += this.speed
      this.element.style.transitionDuration = Snowflake.intervalMs + 'ms'

      if (this.top > this.availableHeight) {
        this.element.style.transitionDuration = '0ms'
        this.#initializePositionAndColor()
        this.#applyInitialStyles()
      } else {
        this.element.style.translate = `0 ${this.top}px`
      }
    }, Snowflake.intervalMs)
  }

  stop() {
    if (!this.intervalId) return

    clearInterval(this.intervalId)
    this.intervalId = null
  }
}

class Snowfall {
  /**
   * @param {string} selector
   * @param {number} snowAmount
   * @throws {ReferenceError} If the container selector is not found.
   */
  constructor(selector, snowAmount) {
    this.container = document.querySelector(selector)

    if (!this.container)
      throw new ReferenceError(`Selector '${selector}' not found.`)

    this.intensity = snowAmount

    /** @type {Snowflake[]} */
    this.snowflakes = Array.from(
      {length: snowAmount},
      () => new Snowflake(this.container),
    )
  }

  fall() {
    for (const snowflake of this.snowflakes) {
      snowflake.fall()
    }
  }

  stop() {
    for (const snowflake of this.snowflakes) {
      snowflake.stop()
    }
  }
}

// =============================================================================

const blizzard = new Snowfall('.js-snowfall', 50)

blizzard.fall()
