export default class Spinner {
  options
  $el

  constructor(options = {}) {
    this.options = {
      className: '',
      hint: 'Loading...',
      ...options,
    }
  }

  /** @param {string} [cssSelector] */
  render(cssSelector) {
    this.$el = document.createElement('div')
    this.$el.className = `c-spinner ${this.options.className}`
    this.$el.setAttribute('aria-live', 'polite')

    const hint = document.createElement('span')
    hint.textContent = this.options.hint
    hint.className = 'c-spinner__hint'

    this.$el.append(hint)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}
