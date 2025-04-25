'use strict'

/**
 * @see {Snowflake}
 * @typedef {Object} SnowflakeOptions - Configuration options for a snowflake instance.
 * @property {number} [options.intervalMs=1000] - The update position interval in milliseconds.
 * @property {number} [options.minSize=36] - The minimum size of the snowflake.
 * @property {number} [options.maxSize=72] - The maximum size of the snowflake.
 * @property {number} [options.minHue=190] - The minimum hue value for the snowflake's color.
 * @property {number} [options.maxHue=210] - The maximum hue value for the snowflake's color.
 * @property {number} [options.minSaturation=30] - The minimum saturation percentage for the snowflake's color.
 * @property {number} [options.maxSaturation=80] - The maximum saturation percentage for the snowflake's color.
 * @property {number} [options.minLightness=70] - The minimum lightness percentage for the snowflake's color.
 * @property {number} [options.maxLightness=90] - The maximum lightness percentage for the snowflake's color.
 * @property {number} [options.minSpeed=45] - The minimal snowflake step.
 * @property {number} [options.maxSpeed=240] - The maximal snowflake step.
 */

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
  /**
   * @param {Element} containerSelector
   * @param {string} templateSelector
   * @param {SnowflakeOptions} [options]
   */
  constructor(containerSelector, templateSelector, options = {}) {
    this.templateSelector = templateSelector
    /** @type {SnowflakeOptions} */
    this.options = {
      intervalMs: 1000,
      minSize: 36,
      maxSize: 72,
      minHue: 190,
      maxHue: 210,
      minSaturation: 30,
      maxSaturation: 80,
      minLightness: 70,
      maxLightness: 90,
      minSpeed: 45,
      maxSpeed: 240,
      ...options,
    }

    this.intervalId = null
    this.size = getRandomInteger(this.options.minSize, this.options.maxSize)
    this.element = this.#createFromTemplate()
    this.#initializePositionAndColor()
    this.#applyInitialStyles()

    this.container = document.querySelector(containerSelector)

    if (!this.container)
      throw new ReferenceError(`Selector '${containerSelector}' not found.`)

    this.container.append(this.element)
  }

  get availableWidth() {
    return document.documentElement.clientWidth - this.size
  }

  get availableHeight() {
    return document.documentElement.clientHeight + this.size + this.speed
  }

  #createFromTemplate() {
    const template = document.querySelector(this.templateSelector)

    if (!(template instanceof HTMLTemplateElement))
      throw new TypeError("Can't find the template.")

    /** @type {HTMLElement}  */
    const snowflakeEl = template.content.firstElementChild.cloneNode(true)

    return snowflakeEl
  }

  #initializePositionAndColor() {
    this.top = -this.size
    this.left = getRandomInteger(0, this.availableWidth)
    this.color = new ColorHSL(
      getRandomInteger(this.options.minHue, this.options.maxHue),
      getRandomInteger(this.options.minSaturation, this.options.maxSaturation),
      getRandomInteger(this.options.minLightness, this.options.maxLightness),
    )

    this.speed = getRandomInteger(this.options.minSpeed, this.options.maxSpeed)
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
      this.element.style.transitionDuration = this.options.intervalMs + 'ms'

      if (this.top > this.availableHeight) {
        this.element.style.transitionDuration = '0ms'
        this.#initializePositionAndColor()
        this.#applyInitialStyles()
      } else {
        this.element.style.translate = `0 ${this.top}px`
      }
    }, this.options.intervalMs)
  }

  stop() {
    if (!this.intervalId) return

    clearInterval(this.intervalId)
    this.intervalId = null
  }
}

class Snowfall {
  /**
   * @param {string} containerSelector
   * @param {string} templateSelector
   * @param {number} snowAmount
   * @param {SnowflakeOptions} options
   */
  constructor(containerSelector, templateSelector, snowAmount, options = {}) {
    this.container = document.querySelector(containerSelector)

    this.snowAmount = snowAmount

    /** @type {Snowflake[]} */
    this.snowflakes = Array.from(
      {length: snowAmount},
      () => new Snowflake(containerSelector, templateSelector, options),
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

const blizzard = new Snowfall('.js-snowfall', '.js-snowflake-template', 80)

blizzard.fall()
