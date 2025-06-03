import CataasAPI from './cataas_api.js'
import Field from './field.js'
import Spinner from './spinner.js'

export default class CatCard {
  options
  spinnerEl
  imgEl
  fieldEl
  getBtn
  $el

  constructor(options) {
    this.options = {
      btnLabel: 'Get a cat!',
      placeholder: 'A cat says:',
      alt: 'A cat',
      spinnerLabel: 'Loading...',
      cssObj: {
        main: 'u-flow-400',
        controls: 'u-flex u-gap-200',
        btn: 'u-flex-none',
        img: 'u-min-bs-4000 u-max-bs-8000 u-text-none',
        imgContainer:
          'u-relative u-grid u-place-items-center u-is-fit u-rounded-lg u-mi-auto',
        spinner: 'c-spinner u-absolute',
      },
      ...options,
    }
  }

  #renderSpinner() {
    const spinnerEl = new Spinner(this.options.spinnerLabel).render()
    spinnerEl.className = this.options.cssObj.spinner
    return spinnerEl
  }

  #renderImg() {
    const imgEl = document.createElement('img')

    imgEl.alt = this.options.alt
    imgEl.classList = this.options.cssObj.img

    const imgContainer = document.createElement('div')
    imgContainer.classList = this.options.cssObj.imgContainer
    imgContainer.append(imgEl)

    return {imgContainer, imgEl}
  }

  #renderControls() {
    const {$el: fieldEl, inputEl} = new Field({
      placeholder: this.options.placeholder,
    }).render()
    const getBtn = this.#renderBtn(this.options.btnLabel)

    const controlsEl = document.createElement('div')
    controlsEl.className = this.options.cssObj.controls
    controlsEl.append(fieldEl, getBtn)

    return {controlsEl, fieldEl, getBtn, inputEl}
  }

  #renderBtn(label) {
    const btnEl = document.createElement('button')
    btnEl.textContent = label
    // btnEl.type = 'button'
    btnEl.className = this.options.cssObj.btn

    return btnEl
  }

  async #renderPicture() {
    const phrase = this.inputEl.value.trim()

    this.getBtn.disabled = true
    this.imgContainer.append(this.spinnerEl)

    try {
      const imgURL =
        phrase !== ''
          ? await CataasAPI.getCatSays(phrase)
          : await CataasAPI.getCat()

      this.imgEl.src = imgURL
    } finally {
      this.getBtn.disabled = false
      this.spinnerEl.remove()
    }
  }

  /** @param {SubmitEvent} e */
  #onGet(e) {
    e.preventDefault()

    return this.#renderPicture()
  }

  async render(cssSelector) {
    this.spinnerEl = this.#renderSpinner()

    const controls = this.#renderControls()
    this.fieldEl = controls.fieldEl

    this.inputEl = controls.inputEl

    this.getBtn = controls.getBtn

    const image = this.#renderImg()
    this.imgEl = image.imgEl
    this.imgContainer = image.imgContainer

    this.$el = document.createElement('form')
    this.$el.append(controls.controlsEl, this.imgContainer)
    this.$el.className = this.options.cssObj.main
    this.$el.addEventListener('submit', this.#onGet.bind(this))

    // get a random cat for the init view
    this.#renderPicture()

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}
