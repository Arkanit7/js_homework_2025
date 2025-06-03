export default class Spinner {
  static SECTORS = ['red', 'blue', 'green', 'yellow']

  $el
  message

  constructor(message) {
    this.message = message
  }

  #renderSector(color) {
    const sectorEl = document.createElement('div')
    sectorEl.className = `c-spinner__sector c-spinner__sector--type--${color}`

    return sectorEl
  }

  render(cssSelector) {
    const messageEl = document.createElement('span')
    messageEl.textContent = this.message

    this.$el = document.createElement('div')
    this.$el.classList = 'c-spinner'
    this.$el.append(messageEl)

    for (const sector of Spinner.SECTORS) {
      const sectorEl = this.#renderSector(sector)
      this.$el.append(sectorEl)
    }

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}
