'use strict'

class Select {
  static events = {
    selection: 'select:selection',
  }

  attribute
  valuesList
  cssClass
  value
  $el

  constructor(attribute, valuesList, cssClass = '') {
    this.attribute = attribute
    this.valuesList = valuesList
    this.cssClass = cssClass
  }

  dispatchSelection() {
    const selectionEvent = new CustomEvent(Select.events.selection, {
      detail: {
        [this.attribute]: this.value,
      },
      bubbles: true,
    })

    this.$el.dispatchEvent(selectionEvent)
  }

  handleSelection() {
    const index = this.$el.selectedIndex
    this.value = this.valuesList[index]
    this.dispatchSelection()
  }

  render(cssSelector) {
    this.$el = document.createElement('SELECT')
    this.$el.className = this.cssClass
    this.$el.addEventListener('change', this.handleSelection.bind(this))

    for (const value of this.valuesList) {
      const optionEl = document.createElement('OPTION')

      optionEl.textContent = value
      this.$el.append(optionEl)
    }

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class Filter {
  static events = {
    change: 'filter:apply',
  }

  filters
  selectedFilters = {}
  itemsList
  filteredItemsList
  cssObj
  $el

  constructor(filters, itemsList, cssObj = {}) {
    this.filters = filters
    this.itemsList = itemsList
    this.filteredItemsList = itemsList
    this.cssObj = {base: '', label: '', select: '', ...cssObj}
  }

  getFilteredItems(attribute, value) {
    return this.filteredItemsList.filter((item) => item[attribute] === value)
  }

  applyFilters() {
    this.filteredItemsList = this.itemsList // reset

    for (const [attribute, value] of Object.entries(this.selectedFilters)) {
      if (value === '') continue

      this.filteredItemsList = this.getFilteredItems(attribute, value)
    }
  }

  dispatchFilteredIds() {
    const customEvent = new CustomEvent(Filter.events.change, {
      detail: this.filteredItemsList.map(({id}) => id),
      bubbles: true,
    })

    this.$el.dispatchEvent(customEvent)
  }

  renderSelect(attribute) {
    const attributeValues = [''] // add an empty option

    for (const item of this.itemsList) {
      const value = item[attribute]

      if (attributeValues.includes(value)) continue

      attributeValues.push(value)
    }

    attributeValues.sort()

    return new Select(attribute, attributeValues, this.cssObj.select).render()
  }

  /** @param {CustomEvent} e */
  handleFilterApply({detail}) {
    this.selectedFilters = {...this.selectedFilters, ...detail}

    this.applyFilters()
    this.dispatchFilteredIds()
  }

  renderFilters() {
    const filtersEl = document.createElement('FORM')

    for (const {attribute, label} of this.filters) {
      const selectEl = this.renderSelect(attribute)

      const labelEl = document.createElement('LABEL')
      labelEl.className = this.cssObj.label
      labelEl.append(label, selectEl)

      filtersEl.append(labelEl)
    }

    filtersEl.addEventListener(
      Select.events.selection,
      this.handleFilterApply.bind(this),
    )

    return filtersEl
  }

  render(cssSelector) {
    this.$el = this.renderFilters()
    this.$el.className = this.cssObj.base

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class Car {
  static renderTHead() {
    const rowEl = document.createElement('TR')

    for (const label of arguments) {
      const cell = document.createElement('TH')
      cell.textContent = label
      rowEl.append(cell)
    }

    const tHeadEl = document.createElement('THEAD')
    tHeadEl.append(rowEl)

    return tHeadEl
  }

  id
  brand
  year
  price
  color
  cssObj
  $el

  constructor({id, brand, year, color, price}, cssObj = {}) {
    this.id = id
    this.brand = brand
    this.year = year
    this.color = color
    this.price = price
    this.cssObj = {
      base: '',
      ...cssObj,
    }
  }

  renderCell(label) {
    const cellEl = document.createElement('TD')
    cellEl.textContent = label

    return cellEl
  }

  render(cssSelector) {
    this.$el = document.createElement('TR')
    this.$el.className = this.cssObj.base

    this.$el.append(
      this.renderCell(this.brand),
      this.renderCell(this.year),
      this.renderCell(this.color),
      this.renderCell(this.price),
    )

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class CarFilter {
  /** @type {{attribute: string, value: string}[]} */
  filters
  carsList
  /** An object that holds Car id to their respectful class instances
   *
   * @example { 65: new Car(), 54: new Car(), ... }
   * @type {Object<string, Car>}
   * */
  label
  carToIdObjects
  cssObj
  $el

  constructor(filters, carsList, label, cssObj = {}) {
    this.filters = filters
    this.carsList = carsList
    this.label = label
    this.cssObj = {
      base: '',
      header: '',
      body: '',
      table: '',
      itemObj: {},
      filterObj: {},
      ...cssObj,
    }
    this.carToIdObjects = this.createCarToIdObjects()
  }

  createCarToIdObjects() {
    const obj = {}

    for (const car of this.carsList) {
      obj[car.id] = new Car(car, this.cssObj.itemObj)
    }

    return obj
  }

  renderTable() {
    const tHeadEl = Car.renderTHead('Марка', 'Рік', 'Колір', 'Ціна')
    const tBodyEl = this.renderTBody()

    const tableEl = document.createElement('TABLE')
    tableEl.append(tHeadEl, tBodyEl)

    const tableContainer = document.createElement('DIV')
    tableContainer.append(tableEl)
    tableContainer.className = this.cssObj.table

    return tableContainer
  }

  renderTBody() {
    const tBodyEl = document.createElement('TBODY')
    tBodyEl.className = this.cssObj.list

    for (const id in this.carToIdObjects) {
      tBodyEl.append(this.carToIdObjects[id].render())
    }

    return tBodyEl
  }

  hideCars() {
    for (const id in this.carToIdObjects) {
      this.carToIdObjects[id].$el.hidden = true
    }
  }

  /**
   * @param {CustomEvent} e
   */
  handleFilter({detail: filteredIds}) {
    this.hideCars()

    for (const id of filteredIds) {
      this.carToIdObjects[id].$el.hidden = false
    }
  }

  render(cssSelector) {
    const headerEl = document.createElement('H3')
    headerEl.className = this.cssObj.header
    headerEl.textContent = this.label

    this.filterEl = new Filter(
      this.filters,
      this.carsList,
      this.cssObj.filterObj,
    ).render()
    this.filterEl.addEventListener(
      Filter.events.change,
      this.handleFilter.bind(this),
    )

    this.tableEl = this.renderTable()

    const bodyEl = document.createElement('DIV')
    bodyEl.className = this.cssObj.body
    bodyEl.append(this.filterEl, this.tableEl)

    this.$el = document.createElement('DIV')
    this.$el.className = this.cssObj.base
    this.$el.append(headerEl, bodyEl)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

// =============================================================================
const cars = [
  {
    id: 0,
    brand: 'Toyota',
    year: 2018,
    color: 'червоний',
    price: 21000,
  },
  {
    id: 1,
    brand: 'Toyota',
    year: 2020,
    color: 'синій',
    price: 25000,
  },
  {
    id: 2,
    brand: 'Toyota',
    year: 2023,
    color: 'білий',
    price: 25000,
  },
  {
    id: 3,
    brand: 'BMW',
    year: 2018,
    color: 'блакитний',
    price: 41000,
  },
  {
    id: 4,
    brand: 'BMW',
    year: 2022,
    color: 'помаранчевий',
    price: 25000,
  },
  {
    id: 5,
    brand: 'BMW',
    year: 2023,
    color: 'білий',
    price: 45000,
  },
  {
    id: 6,
    brand: 'Ford',
    year: 2018,
    color: 'синій',
    price: 18000,
  },
  {
    id: 7,
    brand: 'Ford',
    year: 2023,
    color: 'блакитний',
    price: 18000,
  },
  {
    id: 8,
    brand: 'Mercedes-Benz',
    year: 2023,
    color: 'помаранчевий',
    price: 60000,
  },
  {
    id: 9,
    brand: 'Hyundai',
    year: 2021,
    color: 'білий',
    price: 22000,
  },
  {
    id: 10,
    brand: 'Hyundai',
    year: 2023,
    color: 'червоний',
    price: 36000,
  },
]
const carFilters = [
  {attribute: 'brand', label: 'марка'},
  {attribute: 'year', label: 'рік'},
  {attribute: 'color', label: 'колір'},
]
const cssObj = {
  base: 'showroom | u-p-400 u-flow-500 u-border-zinc-700 u-rounded-lg',
  header: 'u-text-center',
  body: 'showroom__body | u-gap-400',
  table: 'showroom__table',
  filterObj: {
    base: 'showroom__filter | u-grid u-gap-200',
    label: 'u-grid u-gap-100 u-capitalize u-font-bolder',
    select: '',
  },
}
const carFiltration = new CarFilter(carFilters, cars, 'Фільтр авто', cssObj)

carFiltration.render('.js-app')
