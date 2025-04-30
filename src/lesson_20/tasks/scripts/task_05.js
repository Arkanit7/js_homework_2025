'use strict'

/**
 * @see {EntrySearch}
 * @typedef {Object} EntrySearchCSSClasses
 * @property {Object} [search]
 * @property {string} [search.base]
 * @property {string} [search.header]
 * @property {string} [search.list]
 * @property {string} [search.empty]
 * @property {string} [search.input]
 * @property {string} [entry]
 */

/**
 * @see {EntrySearch}
 * @typedef {Object} EntrySearchOptions
 * @property {string} [headerText]
 * @property {string} [emptyText]
 * @property {string} [inputText]
 */

class Entry {
  /** @type {string} */
  name
  /** @type {string} */
  cssClass
  /** @type {HTMLDivElement} */
  $el
  isHidden = false

  /**
   * @param {string} name
   * @param {string} [cssClass]
   */
  constructor(name, cssClass = '') {
    this.name = name
    this.cssClass = cssClass
  }

  /** @param {string} fragment */
  includes(fragment) {
    return this.name.toLowerCase().includes(fragment.trim().toLowerCase())
  }

  show() {
    this.isHidden = false
    this.$el.hidden = false
  }

  hide() {
    this.isHidden = true
    this.$el.hidden = true
  }

  render(cssSelector) {
    this.$el = document.createElement('LI')
    this.$el.className = this.cssClass
    this.$el.textContent = this.name

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class EntrySearch {
  /** @type {string[]} */
  entryList
  /** @type {EntrySearchCSSClasses} */
  cssClasses
  /** @type {EntrySearchOptions} */
  options
  /** @type {Entry[]} */
  entryObjectList
  /** @type {HTMLInputElement} */
  inputEl
  /** @type {HTMLUListElement} */
  entryListEl
  /** @type {HTMLLIElement} */
  emptyEl
  /** @type {HTMLDivElement} */
  $el

  /**
   * @param {string[]} entryList
   * @param {EntrySearchCSSClasses} [cssClasses]
   * @param {EntrySearchOptions} [options]
   */
  constructor(entryList, cssClasses = {}, options = {}) {
    this.cssClasses = {
      search: {
        base: 'search',
        header: 'search__header',
        list: 'search__list',
        empty: 'search__empty',
        input: 'search__input',
      },
      entry: 'search__item',
      ...cssClasses,
    }

    this.options = {
      headerText: 'Search',
      emptyText: 'Nothing found.',
      inputText: 'Type something to search...',
      ...options,
    }

    this.entryList = entryList
    this.entryObjectList = entryList.map(
      (entry) => new Entry(entry, this.cssClasses.entry),
    )
  }

  #renderInput() {
    const inputEl = document.createElement('INPUT')

    inputEl.type = 'search'
    inputEl.placeholder = this.options.inputText
    inputEl.className = this.cssClasses.search.input

    return inputEl
  }

  #renderEntryList() {
    const listEl = document.createElement('UL')

    listEl.className = this.cssClasses.search.list

    for (const entryObj of this.entryObjectList) {
      listEl.append(entryObj.render())
    }

    return listEl
  }

  #renderHeader() {
    const headerEl = document.createElement('H3')

    headerEl.textContent = this.options.headerText
    headerEl.className = this.cssClasses.search.header

    return headerEl
  }

  #renderEmpty() {
    const emptyEl = document.createElement('li')

    emptyEl.textContent = this.options.emptyText
    emptyEl.className = this.cssClasses.search.empty

    return emptyEl
  }

  handleSearch() {
    const value = this.inputEl.value

    for (const entryObj of this.entryObjectList) {
      if (entryObj.includes(value)) entryObj.show()
      else entryObj.hide()
    }

    const nothingFound = this.entryObjectList.every(({isHidden}) => isHidden)

    if (nothingFound && !this.emptyEl.isConnected)
      this.entryListEl.append(this.emptyEl)
    else if (!nothingFound && this.emptyEl.isConnected) this.emptyEl.remove()
  }

  render(cssSelector) {
    const headerEl = this.#renderHeader()

    this.inputEl = this.#renderInput()
    this.inputEl.addEventListener('input', this.handleSearch.bind(this))

    this.entryListEl = this.#renderEntryList()

    this.emptyEl = this.#renderEmpty()

    this.$el = document.createElement('DIV')
    this.$el.className = this.cssClasses.search.base
    this.$el.append(headerEl, this.inputEl, this.entryListEl)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

// =============================================================================

const employeeList = [
  'Білостоцький Ростислав',
  'Ковальчук Анастасія',
  'Коб Тетяна',
  'Власенко Ілля',
  'Баланюк Владислав',
  'Ковтун Ігор',
  'Огородник Андрій',
  'Корець Вероніка',
]
/** @type {EntrySearchCSSClasses} */
const searchCssClasses = {
  search: {
    base: 'u-max-is-sm u-pb-400 u-pi-300 u-flow-200 u-rounded-lg u-border',
    header: 'u-text-450 u-font-bolder u-text-center',
    list: 'u-flow-100',
    empty: 'u-text-zinc-400',
    input: 'c-input',
  },
}
/** @type {EntrySearchOptions} */
const searchOptions = {
  headerText: 'Працівники',
  emptyText: 'Нічого не знайдено :(',
  inputText: 'Пошук',
}
const employeeSearch = new EntrySearch(
  employeeList,
  searchCssClasses,
  searchOptions,
)

// =============================================================================

const frameworks = [
  'React',
  'Angular',
  'Vue.js',
  'Svelte',
  'Ember.js',
  'Backbone.js',
  'Preact',
  'SolidJS',
  'Qwik',
  'Astro',
  'Next.js',
  'Nuxt.js',
  'Remix',
  'Gatsby',
  'Meteor',
  'Alpine.js',
  'Lit',
  'Mithril',
  'Aurelia',
  'Knockout',
]
/** @type {EntrySearchCSSClasses} */
const frameworkCssClasses = {
  search: {
    base: 'u-max-is-sm u-pb-400 u-pi-300 u-flow-200 u-rounded-lg u-border-yellow-400 u-text-purple-600',
    header: 'u-text-450 u-font-bolder u-text-center',
    list: 'u-flow-100',
    empty: 'u-text-zinc-400',
    input: 'c-input',
  },
}
const frameworkSearch = new EntrySearch(frameworks, frameworkCssClasses, {
  headerText: 'JS Frameworks',
})

// =============================================================================

const containerEl = document.querySelector('.js-app')

containerEl?.append(employeeSearch.render(), frameworkSearch.render())
