export default class Field {
  options
  id = crypto.randomUUID()

  constructor(options) {
    this.options = {
      type: 'text',
      ...options,
    }
  }

  #renderInput() {
    const inputEl = document.createElement('input')
    inputEl.type = this.options.type

    if (this.options.placeholder) inputEl.placeholder = this.options.placeholder

    return inputEl
  }

  #renderLabel() {
    const labelEl = document.createElement('label')
    labelEl.textContent = this.options.label

    return labelEl
  }

  /**
   * @param {HTMLInputElement} inputEl
   * @param {HTMLLabelElement} labelEl
   */
  #bindInputWithLabel(inputEl, labelEl) {
    inputEl.id = this.id
    labelEl.setAttribute('for', this.id)
  }

  /** @param {string} [cssSelector] */
  render(cssSelector) {
    this.$el = new DocumentFragment()

    const inputEl = this.#renderInput()
    this.$el.append(inputEl)

    if (this.options.label) {
      const labelEl = this.#renderLabel()
      this.#bindInputWithLabel(inputEl, labelEl)
      this.$el.prepend(labelEl)
    }

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return {$el: this.$el, inputEl}
  }
}
