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

  dispatchFiltration() {
    const customEvent = new CustomEvent(Filter.events.change, {
      detail: this.filteredItemsList,
      bubbles: true,
    })

    this.$el.dispatchEvent(customEvent)
  }

  renderSelect(attribute, label) {
    const attributeValues = [''] // add an empty option

    for (const item of this.itemsList) {
      const value = item[attribute]

      if (attributeValues.includes(value)) continue

      attributeValues.push(value)
    }

    attributeValues.sort()

    return new Select(attribute, attributeValues, this.cssObj.select).render()
  }

  handleFilterApply({detail}) {
    this.selectedFilters = {...this.selectedFilters, ...detail}

    this.applyFilters()
    this.dispatchFiltration()
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

    filtersEl.addEventListener(Select.events.selection, (e) =>
      this.handleFilterApply(e),
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
  id
  brand
  year
  price
  cssObj
  $el

  constructor({id, brand, year, price}, cssObj = {}) {
    this.id = id
    this.brand = brand
    this.year = year
    this.price = price
    this.cssObj = {
      base: '',
      ...cssObj,
    }
  }

  toString() {
    return `${this.brand} - ${this.year} - $${this.price}`
  }

  render(cssSelector) {
    this.$el = document.createElement('DIV')
    this.$el.textContent = this.toString()
    this.$el.className = this.cssObj.base

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class CarFilter {
  filters
  carsList
  cssObj
  $el

  constructor(filters, carsList, cssObj = {}) {
    this.filters = filters
    this.carsList = carsList
    this.cssObj = {
      base: '',
      list: '',
      itemObj: {},
      filterObj: {},
      ...cssObj,
    }
  }

  // createCarToIdObjects() {
  //   const obj = {}

  //   for (const car of this.carsList) {

  //   }
  // }

  renderCars() {
    const carsContainer = document.createElement('DIV')
    carsContainer.className = this.cssObj.list

    for (const car of this.carsList) {
      carsContainer.append(car.render())
    }

    return carsContainer
  }

  hideCars() {
    for (const car of this.carsList) {
      car.$el.hidden = true
    }
  }

  handleFilter(e) {
    const filteredCars = e.detail

    this.hideCars()

    for (const car of filteredCars) {
      car.$el.hidden = false
    }
  }

  render(cssSelector) {
    this.filterEl = new Filter(
      this.filters,
      this.carsList,
      this.cssObj.filterObj,
    ).render()
    this.filterEl.addEventListener(Filter.events.change, (e) =>
      this.handleFilter(e),
    )

    this.carsEl = this.renderCars()

    this.$el = document.createElement('DIV')
    this.$el.className = this.cssObj.base
    this.$el.append(this.filterEl, this.carsEl)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

// =============================================================================
const cars = [
  new Car({
    id: 0,
    brand: 'Toyota',
    year: 2018,
    price: 21000,
  }),
  new Car({
    id: 1,
    brand: 'Toyota',
    year: 2020,
    price: 25000,
  }),
  new Car({
    id: 2,
    brand: 'Toyota',
    year: 2023,
    price: 25000,
  }),
  new Car({
    id: 3,
    brand: 'BMW',
    year: 2018,
    price: 41000,
  }),
  new Car({
    id: 4,
    brand: 'BMW',
    year: 2022,
    price: 25000,
  }),
  new Car({
    id: 5,
    brand: 'BMW',
    year: 2023,
    price: 45000,
  }),
  new Car({
    id: 6,
    brand: 'Ford',
    year: 2018,
    price: 18000,
  }),
  new Car({
    id: 7,
    brand: 'Ford',
    year: 2023,
    price: 18000,
  }),
  new Car({
    id: 8,
    brand: 'Mercedes-Benz',
    year: 2023,
    price: 60000,
  }),
  new Car({
    id: 9,
    brand: 'Hyundai',
    year: 2021,
    price: 22000,
  }),
  new Car({
    id: 10,
    brand: 'Hyundai',
    year: 2023,
    price: 36000,
  }),
]
const carFilters = [
  {attribute: 'brand', label: 'марка'},
  {attribute: 'year', label: 'рік'},
]
const cssObj = {
  base: 'u-max-is-sm u-p-400 u-flow-400 u-border-zinc-700 u-rounded-lg',
  list: 'u-flow-200',
  itemObj: {
    base: 'car',
  },
  filterObj: {
    base: 'u-grid u-gap-200',
    label: 'u-grid u-gap-100 u-capitalize u-font-bolder',
    select: '',
  },
}
const carFiltration = new CarFilter(carFilters, cars, cssObj)

carFiltration.render('.js-app')
