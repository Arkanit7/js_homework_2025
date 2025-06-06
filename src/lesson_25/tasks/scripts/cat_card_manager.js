import Field from './field.js'
import CatCard from './cat_card.js'

export default class CatCardManager {
  constructor(options) {
    this.options = {
      amount: 1,
      imgSrc: '',
      btnLabel: 'Get cats!',
      placeholder: 'Cats say:',
      alt: 'A cat',
      spinnerLabel: 'Loading...',
      styles: {
        main: 'u-flow-400',
        controls: 'u-flex u-flex-wrap u-gap-200',
        btn: 'u-flex-none',
        imgContainer: 'u-flex u-justify-center u-flex-wrap u-gap-200',
        imgFrame:
          'u-relative u-grid u-place-items-center u-aspect-3/4 u-is-5600 u-rounded-lg u-overflow-hidden',
        img: 'u-ibg u-object-cover u-text-none',
        spinner: 'u-text-yellow-400 u-absolute',
      },
      ...options,
    }
  }

  /** @param {string} label */
  #renderBtn(label) {
    const btnEl = document.createElement('button')
    btnEl.textContent = label
    // btnEl.type = 'button'
    btnEl.className = this.options.styles.btn

    return btnEl
  }

  #renderControls() {
    const getBtn = this.#renderBtn(this.options.btnLabel)

    const {$el: fieldEl, inputEl} = new Field({
      placeholder: this.options.placeholder,
    }).render()

    inputEl.classList.add('u-flex-auto', 'u-is-4000')

    const controlsEl = document.createElement('div')
    controlsEl.className = this.options.styles.controls
    controlsEl.append(fieldEl, getBtn)

    return {controlsEl, fieldEl, getBtn, inputEl}
  }

  /** @param {SubmitEvent} e */
  async handleSubmit(e) {
    e.preventDefault()

    // prevent multiple requests
    if (this.getBtn.disabled) return
    this.getBtn.disabled = true

    const phrase = this.inputEl.value.trim()

    await Promise.allSettled(
      this.catCards.map((card) => card.reloadImg(phrase)),
    )

    this.getBtn.disabled = false
  }

  /** @param {string} [cssSelector] */
  render(cssSelector) {
    this.$el = document.createElement('form')
    this.$el.className = this.options.styles.main
    this.$el.addEventListener('submit', this.handleSubmit.bind(this))

    const {controlsEl, inputEl, getBtn} = this.#renderControls()
    this.inputEl = inputEl
    this.getBtn = getBtn
    this.$el.append(controlsEl)

    this.catCards = Array.from(
      {length: this.options.amount},
      () =>
        new CatCard({imgSrc: this.options.imgSrc, styles: this.options.styles}),
    )
    const imgContainer = document.createElement('div')
    imgContainer.className = this.options.styles.imgContainer
    imgContainer.append(...this.catCards.map((card) => card.render()))
    this.$el.append(imgContainer)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}
