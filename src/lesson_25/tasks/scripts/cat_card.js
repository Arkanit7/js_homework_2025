import CataasAPI from './cataas_api.js'
import Spinner from './spinner.js'

export default class CatCard {
  $el
  spinnerEl
  imgEl

  constructor(options) {
    this.options = {
      imgSrc: '',
      alt: 'A cat',
      spinnerLabel: 'Loading...',
      styles: {
        imgFrame:
          'u-relative u-grid u-place-items-center u-aspect-3/4 u-is-6000 u-rounded-lg u-overflow-hidden',
        img: 'u-ibg u-object-cover u-text-none',
        spinner: 'u-text-yellow-400 u-absolute',
      },
      ...options,
    }
  }

  #renderSpinner() {
    const spinnerEl = new Spinner({
      className: this.options.styles.spinner,
      label: this.options.spinnerLabel,
    }).render()

    return spinnerEl
  }

  #renderPicture() {
    const imgEl = document.createElement('img')

    imgEl.src = this.options.imgSrc
    imgEl.alt = this.options.alt
    imgEl.className = this.options.styles.img

    const imgFrameEl = document.createElement('div')
    imgFrameEl.className = this.options.styles.imgFrame
    imgFrameEl.append(imgEl)

    return {imgFrameEl, imgEl}
  }

  async reloadImg(phrase = '') {
    this.$el.append(this.spinnerEl)

    try {
      const imgURL =
        phrase !== ''
          ? await CataasAPI.getCatSays(phrase)
          : await CataasAPI.getCat()

      this.imgEl.src = imgURL
    } catch (error) {
      console.error(error)
    } finally {
      this.spinnerEl.remove()
    }
  }

  /** @param {string} [cssSelector] */
  render(cssSelector) {
    const {imgFrameEl, imgEl} = this.#renderPicture()
    this.$el = imgFrameEl
    this.imgEl = imgEl

    this.spinnerEl = this.#renderSpinner()

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}
