import CataasAPI from './cataas_api.js'
import Field from './field.js'
import Spinner from './spinner.js'

export default class CatCard {
  $el
  options
  #getBtn
  #imgContainer
  #imgEl
  #inputEl
  #spinnerEl

  constructor(options) {
    this.options = {
      imgSrc: '',
      btnLabel: 'Get a cat!',
      placeholder: 'A cat says:',
      alt: 'A cat',
      spinnerLabel: 'Loading...',
      cssObj: {
        main: 'u-flow-400',
        controls: 'u-flex u-gap-200',
        btn: 'u-flex-none',
        img: 'u-min-bs-4000 u-max-bs-8000 u-text-none u-rounded-lg',
        imgContainer:
          'u-relative u-grid u-place-items-center u-is-fit u-rounded-lg u-mi-auto',
        spinner: 'u-text-yellow-400 u-absolute',
      },
      ...options,
    }
  }

  #renderSpinner() {
    const spinnerEl = new Spinner({
      className: this.options.cssObj.spinner,
      label: this.options.spinnerLabel,
    }).render()

    return spinnerEl
  }

  #renderImg() {
    const imgEl = document.createElement('img')

    imgEl.src = this.options.imgSrc
    imgEl.alt = this.options.alt
    imgEl.className = this.options.cssObj.img

    const imgContainer = document.createElement('div')
    imgContainer.className = this.options.cssObj.imgContainer
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

  /** @param {string} label */
  #renderBtn(label) {
    const btnEl = document.createElement('button')
    btnEl.textContent = label
    // btnEl.type = 'button'
    btnEl.className = this.options.cssObj.btn

    return btnEl
  }

  async #renderPicture() {
    const phrase = this.#inputEl.value.trim()

    this.#getBtn.textContent = this.options.btnLabel
    this.#getBtn.disabled = true
    this.#imgContainer.append(this.#spinnerEl)

    try {
      const imgURL =
        phrase !== ''
          ? await CataasAPI.getCatSays(phrase)
          : await CataasAPI.getCat()

      this.#imgEl.src = imgURL
    } catch (error) {
      console.error(error)
      this.#getBtn.textContent = 'Error'
    } finally {
      this.#getBtn.disabled = false
      this.#spinnerEl.remove()
    }
  }

  /** @param {SubmitEvent} e */
  #onGet(e) {
    e.preventDefault()

    return this.#renderPicture()
  }

  /** @param {string} [cssSelector] */
  render(cssSelector) {
    this.#spinnerEl = this.#renderSpinner()

    const {inputEl, getBtn, controlsEl} = this.#renderControls()
    this.#inputEl = inputEl
    this.#getBtn = getBtn

    const {imgEl, imgContainer} = this.#renderImg()
    this.#imgEl = imgEl
    this.#imgContainer = imgContainer

    this.$el = document.createElement('form')
    this.$el.append(controlsEl, this.#imgContainer)
    this.$el.className = this.options.cssObj.main
    this.$el.addEventListener('submit', this.#onGet.bind(this))

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}
