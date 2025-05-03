'use strict'

class Component {
  xPx
  yPx
  imgSrc
  updateIntervalS
  intervalId
  $el

  /**
   * @param {number} xPx
   * @param {number} yPx
   * @param {string} imgSrc
   * @param {number} updateIntervalS
   */
  constructor(xPx, yPx, imgSrc, updateIntervalS) {
    this.xPx = xPx
    this.yPx = yPx
    this.imgSrc = imgSrc
    this.updateIntervalS = updateIntervalS
  }

  /**
   * @param {number} from
   * @param {number} to
   */
  getRandomInteger(from, to) {
    return from + Math.floor(Math.random() * (to - from + 1))
  }

  action() {
    this.$el.style.translate = this.xPx + 'px ' + this.yPx + 'px'
  }

  /**
   * @param {string} cssSelector
   */
  render(cssSelector) {
    this.$el = document.createElement('IMG')
    this.$el.src = this.imgSrc
    this.$el.alt = ''
    this.$el.style.transitionDuration = this.updateIntervalS + 's'
    this.$el.style.position = 'absolute'
    this.$el.style.zIndex = 9999
    this.action()

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }

  start() {
    if (this.intervalId) return

    this.intervalId = setInterval(
      () => this.action(),
      this.updateIntervalS * 1000,
    )
  }

  stop() {
    if (!this.intervalId) return

    this.intervalId = void clearInterval(this.intervalId)
  }
}

// =============================================================================

class House extends Component {
  scale = 1

  action() {
    this.scale = Math.random()
    this.$el.style.scale = this.scale
    super.action()
  }
}

// ---

const h1 = new House(0, 0, './images/house.webp', 3)
h1.render('.js-app')
h1.start()

// =============================================================================
class MovableComponent extends Component {
  deltaX
  deltaY

  constructor(xPx, yPx, imgSrc, updateIntervalS, deltaX = 0, deltaY = 0) {
    super(xPx, yPx, imgSrc, updateIntervalS)
    this.deltaX = deltaX
    this.deltaY = deltaY
  }

  action() {
    this.xPx += this.getRandomInteger(-this.deltaX, this.deltaX)
    this.yPx += this.getRandomInteger(-this.deltaY, this.deltaY)
    super.action()
  }
}

class Dog extends MovableComponent {
  constructor(xPx, yPx, imgSrc, updateIntervalS, deltaX) {
    super(xPx, yPx, imgSrc, updateIntervalS, deltaX, 0)
  }
  action() {
    this.xPx += this.getRandomInteger(-40, 40)
    super.action()
  }
}

// ---

const d1 = new Dog(10, 200, './images/dog.webp', 1, 40)
d1.render('.js-app')
d1.start()

// =============================================================================

class Bird extends MovableComponent {}

// ---

const b1 = new Bird(10, 70, './images/bird.webp', 1, 40, 40)
b1.render('.js-app')
b1.start()
