'use strict'

class Tank {
  className
  options
  leftPx = 0
  topPx = 0
  intervalId = null

  /**
   * @param {string} cssSelector
   */
  constructor(cssSelector, options = {}) {
    this.cssSelector = cssSelector
    this.options = {
      className: 'tank',
      stepPx: 120,
      speedS: 1,
      removeDelayS: 3,
      hull: {
        className: 'tank__hull',
        imgSrc: './images/tank_hull.webp',
        widthPx: 40,
      },
      turret: {
        className: 'tank__turret tank__turret--offset--regular',
        imgSrc: './images/tank_turret.webp',
        widthPx: 30,
      },
      bang: {
        className: 'tank__bang',
        imgSrc: './images/bang.webp',
        widthPx: 180,
      },
      ...options,
    }

    this.init()
  }

  setInitPosition() {
    this.leftPx =
      (document.documentElement.clientWidth - this.options.hull.widthPx) *
      Math.random()
    this.topPx = 0
  }

  updatePosition() {
    this.topPx += this.options.stepPx
  }

  updatePositionUI() {
    this.$el.style.left = this.leftPx + 'px'
    this.$el.style.top = this.topPx + 'px'

    if (this.topPx >= document.documentElement.clientHeight)
      setTimeout(() => this.remove(), this.options.speedS * 1000 * 2)
  }

  /**@param {PointerEvent} e */
  handleClickToDestroy({offsetX, offsetY}) {
    this.stop()

    this.$el.classList.add('has-blown-up')
    setTimeout(() => this.$el.remove(), this.options.removeDelayS * 1000)

    const bangEl = this.renderBang(offsetX, offsetY)
    bangEl.addEventListener('animationend', (e) => {
      e.stopPropagation()
      bangEl.remove()
    })
    this.$el.append(bangEl)
  }

  /**
   * @param {number} leftPx
   * @param {number} topPx
   */
  renderBang(leftPx, topPx) {
    const bangEl = document.createElement('IMG')
    bangEl.className = this.options.bang.className
    bangEl.src = this.options.bang.imgSrc
    bangEl.alt = ''
    bangEl.width = this.options.bang.widthPx
    bangEl.style.top = topPx + 'px'
    bangEl.style.left = leftPx + 'px'

    return bangEl
  }

  renderTurret() {
    const turretEl = document.createElement('IMG')
    turretEl.src = this.options.turret.imgSrc
    turretEl.alt = ''
    turretEl.width = this.options.turret.widthPx
    turretEl.className = this.options.turret.className

    return turretEl
  }

  renderHull() {
    const hullEl = document.createElement('IMG')
    hullEl.src = this.options.hull.imgSrc
    hullEl.alt = ''
    hullEl.width = this.options.hull.widthPx
    hullEl.className = this.options.hull.className

    return hullEl
  }

  renderTank() {
    const hullEl = this.renderHull()
    const turretEl = this.renderTurret()

    const tankEl = document.createElement('DIV')
    tankEl.className = this.options.className
    tankEl.style.transitionDuration = this.options.speedS + 's'
    tankEl.append(hullEl, turretEl)

    return tankEl
  }

  start() {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      this.updatePosition()
      this.updatePositionUI()
    }, this.options.speedS * 1000)
  }

  stop() {
    if (!this.intervalId) return

    clearInterval(this.intervalId)
    this.intervalId = null
  }

  remove() {
    this.stop()
    this.$el.remove()
  }

  render() {
    this.$el = this.renderTank()
    this.$el.addEventListener('click', this.handleClickToDestroy.bind(this))

    this.setInitPosition()
    this.updatePositionUI()

    document.querySelector(this.cssSelector).append(this.$el)

    return this.$el
  }

  init() {
    this.render()
    this.start()
  }
}

// =============================================================================

for (let i = 0; i < 6; i++) {
  setTimeout(() => new Tank('.js-app'), i * 900)
}

for (let i = 0; i < 5; i++) {
  setTimeout(
    () =>
      new Tank('.js-app', {
        stepPx: 140,
        hull: {
          className: 'tank__hull',
          imgSrc: './images/pixel_tank_hull.webp',
          widthPx: 45,
        },
        turret: {
          className: 'tank__turret tank__turret--offset--pixel',
          imgSrc: './images/pixel_tank_turret.webp',
          widthPx: 30,
        },
      }),
    i * 1600 + 900,
  )
}
