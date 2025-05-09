'use strict'

class TextFilterWidget {
  filteringFn
  cssSelector
  label
  options
  inputEl
  outputEl
  $el

  /**
   * @param {(input: string) => any} filteringFn
   * @param {string} cssSelector
   * @param {string} label
   * @param {Object} [options]
   */
  constructor(filteringFn, label, cssSelector = '.js-app', options = {}) {
    this.filteringFn = filteringFn
    this.cssSelector = cssSelector
    this.label = label
    this.options = {
      widgetClass:
        'u-flex-auto u-flex u-flex-col u-gap-300 u-p-400 u-rounded-lg u-border-zinc-700 u-is-xs',
      headerClass: 'u-flex-auto u-text-center u-font-bolder u-text-350',
      listClass: 'u-flow-200',
      itemClass: 'u-flow-100',
      labelClass: 'u-font-bolder',
      inputClass: 'c-input | u-min-bs-1600 u-max-bs-4000',
      outputClass: 'u-block u-min-bs-700',
      ...options,
    }
    this.render()
  }

  renderInput() {
    /** @type {HTMLTextAreaElement} */
    const inputEl = document.createElement('TEXTAREA')
    inputEl.className = this.options.inputClass
    inputEl.addEventListener('input', this.handleSearch.bind(this))

    return inputEl
  }

  renderField() {
    const uniqueId = crypto.randomUUID()

    const inputEl = this.renderInput()
    inputEl.id = uniqueId

    const labelEl = document.createElement('LABEL')
    labelEl.textContent = 'Вхідні дані'
    labelEl.className = this.options.labelClass
    labelEl.setAttribute('for', uniqueId)

    return {labelEl, inputEl}
  }

  formatInput(input) {
    if (input instanceof Array) return input.join('•')
    if (!input) return 'немає збігів'

    return input
  }

  handleSearch() {
    const input = this.inputEl.value
    const result = this.filteringFn(input)

    this.outputEl.textContent = this.formatInput(result)
  }

  renderOutput() {
    const outputEl = document.createElement('OUTPUT')
    outputEl.className = this.options.outputClass

    return outputEl
  }

  renderItem() {
    const liEl = document.createElement('LI')
    liEl.className = this.options.itemClass

    for (const item of arguments) {
      liEl.append(item)
    }

    return liEl
  }

  renderWidget() {
    const headerEl = document.createElement('H3')
    headerEl.className = this.options.headerClass
    headerEl.textContent = this.label

    const {labelEl, inputEl} = this.renderField()

    const fieldLiEl = this.renderItem(labelEl, inputEl)

    const outputLabelEl = document.createElement('P')
    outputLabelEl.className = this.options.labelClass
    outputLabelEl.textContent = 'Вихідні дані'

    const outputEl = this.renderOutput()

    const outputLiEl = this.renderItem(outputLabelEl, outputEl)

    const listEl = document.createElement('UL')
    listEl.className = this.options.listClass
    listEl.append(fieldLiEl, outputLiEl)

    const widgetEl = document.createElement('ARTICLE')
    widgetEl.className = this.options.widgetClass
    widgetEl.append(headerEl, listEl)

    return {widgetEl, inputEl, outputEl}
  }

  render() {
    const elements = this.renderWidget()
    this.$el = elements.widgetEl
    this.inputEl = elements.inputEl
    this.outputEl = elements.outputEl

    document.querySelector(this.cssSelector).append(this.$el)
  }
}

// =============================================================================

// 6. Дано рядок тексту, вивести усі числа, які є у тексті.
new TextFilterWidget((t) => t.match(/[-+]?\b\d+(\.\d+)?\b/g), '6. Усі числа')

// 7. Дано рядок тексту. Знайти усі знаки пунктуації, які були використано.
const punctuationMarksRegExp = /[.,;:!?()[\]{}'"«»\-–—]/g
new TextFilterWidget(
  (t) => t.match(punctuationMarksRegExp),
  '7. Знаки пунктуації',
)

// 8. Дано рядок тексту. Вивести усі складові, які розділені розділовими знаками.
new TextFilterWidget(
  (t) => t.split(punctuationMarksRegExp).filter(Boolean),
  '8. Між розділовими знаками',
)

// 9. Дано рядок тексту. Перевірити, чи містить він дату у форматі dd.mm.yyyy (dd- день, mm- місяць, yyyy- рік).
new TextFilterWidget(
  (t) =>
    /\b(0?[1-9]|[12]\d|3[01])\.(0?[1-9]|1[0-2])\.\d{4}\b/.test(t) && 'містить',
  '9. Містить дату у форматі dd.mm.yyyy',
)

// 10. Дано рядок тексту. Підрахувати кількість двоцифрових чисел у рядку.
new TextFilterWidget(
  (t) => t.match(/(?<!\d|\d\.)\d{2}(?!\d|\.\d)/g)?.length,
  '10. Кількість двоцифрових чисел',
)

// 11. Визначити чи може бути рядок тексту номером банківської картки (приклад: «4142-3433-2323-3434»). Знайти усі такі номери.
new TextFilterWidget(
  (t) => t.match(/\b\d{4}( |-)?(?:\d{4}\1){2}\d{4}\b/g),
  '11. Банківські номери',
)

// 12. Дано адресу сайту. Визначити, чи є він урядовим (містить домен “gov”).
new TextFilterWidget(
  (t) => /\.gov\b/i.test(t) && 'урядовий',
  '12. Урядовий сайт',
)

// 13. Вибрати усі роки після 2021 року з отриманого повідомлення.
new TextFilterWidget(
  (t) => t.match(/\b(202[2-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3})\b/g),
  '13. Роки після 2021',
)

// 14. Дано номер телефону. Перевірити, чи є цей телефон телефоном з України (починається на «+38»).
new TextFilterWidget(
  (t) =>
    /^\+38[ -]?\(?0\d{2}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/.test(t) &&
    'з України',
  '14. Український номер телефону',
)

// 15. Користувач вводить прізвище та ім’я в одному рядку через пробіл. Замінити пробіл на дефіс.
new TextFilterWidget((t) => t.replaceAll(' ', '–'), '15. Пробіл на дефіс')

// 16. Користувач вводить дату у форматі «день.місяць.рік». Отримати рядкове представлення дати у форматі «день/місяць/рік».
new TextFilterWidget(
  (t) =>
    t.replace(
      /\b(?<day>0?[1-9]|[12]\d|3[01])\.(?<month>0?[1-9]|1[0-2])\.(?<year>\d{4})\b/g,
      '$<day>/$<month>/$<year>',
    ),
  '16. день/місяць/рік',
)

// 17. Користувач вводить день (номер дня (0-6) або «sun,mon,tue,wed,thu,fri,sat»). Визначити, чи є цей день вихідним.
new TextFilterWidget(
  (t) => /\b(0|6|sun|sat)\b/g.test(t) && 'вихідний',
  '17. Чи вихідний',
)
