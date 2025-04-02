'use strict'

class Branch {
  /**
   * @param {string} country
   * @param {string} city
   * @param {string} street
   * @param {string} houseNumber
   */
  constructor(country = '', city = '', street = '', houseNumber = '') {
    this.country = country
    this.city = city
    this.street = street
    this.houseNumber = houseNumber
  }

  toString() {
    return `Country: ${this.country}; City: ${this.city}; Street: ${this.street}; House: ${this.houseNumber}.`
  }
}

class Service {
  #costDollars = 0
  #durationDays = 0

  /**
   * @param {string} title
   * @param {number} costDollars
   * @param {number} durationDays
   */
  constructor(title = '', costDollars, durationDays) {
    this.title = title
    this.costDollars = costDollars
    this.durationDays = durationDays
  }

  // ===========================================================================
  // costDollars

  get costDollars() {
    return this.#costDollars
  }

  set costDollars(newCostDollars) {
    if (newCostDollars < 0) throw new Error("A cost can't be negative.")

    this.#costDollars = newCostDollars
  }

  // ===========================================================================
  // durationDays

  get durationDays() {
    return this.#durationDays
  }

  set durationDays(newDurationDays) {
    if (newDurationDays < 0) throw new Error("A duration can't be negative.")

    this.#durationDays = newDurationDays
  }

  // ===========================================================================
  // toPrimitive

  toString() {
    return `Title: ${this.title}; Cost: $${this.costDollars}; Duration ${this.durationDays} day(s).`
  }
}

class Company {
  #founded
  #brand = ''

  /**
   * @param {string} brand - The company name.
   * @param {{ month: number, year: number }} founded - Year and mont when the company was established.
   * @param {Service[]} services - List of services provided by the company.
   * @param  {Branch[]} branches -List of all company's branches.
   */
  constructor(brand, founded, services = [], branches = []) {
    if (founded.year < 1) throw new Error('A foundation year must be valid.')
    if (founded.month < 1 || founded.month > 12)
      throw new Error('A foundation month must be valid.')

    this.brand = brand
    this.#founded = founded
    this.services = services
    this.branches = branches
  }

  get brand() {
    return this.#brand
  }

  set brand(newBrand) {
    if (newBrand.trim() === '')
      throw new Error("A brand's name must be no-empty.")

    this.#brand = newBrand
  }

  get founded() {
    return this.#founded
  }

  get companyAge() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1 // convert to human format
    const currentYear = currentDate.getFullYear()

    let year = currentYear - this.#founded.year

    if (currentMonth < this.#founded.month) year--

    return year
  }

  /** @param {string} inCity */
  getBranchesByCity(inCity) {
    return this.branches.filter(({ city }) => city === inCity)
  }

  /**
   * @param {number} preferredCostDollars - The maximal cost in dollars of a service.
   * @param {number} [preferredDurationDays = Infinity] - The maximal service duration in days.
   */
  getServicesByCostDollarsDurationDays(
    preferredCostDollars,
    preferredDurationDays = Infinity,
  ) {
    return this.services.filter(
      ({ costDollars, durationDays }) =>
        preferredCostDollars >= costDollars &&
        preferredDurationDays >= durationDays,
    )
  }

  toString() {
    return `Назва: "${this.brand}"; Рік заснування: ${this.founded.year}.`
  }
}

const itAngelsBranches = [
  new Branch('Україна', 'Львів', 'Шевченка', '10'),
  new Branch('Україна', 'Київ', 'Хрещатик', '25'),
  new Branch('Польща', 'Краків', 'Rynek Główny', '1'),
  new Branch('Німеччина', 'Берлін', 'Unter den Linden', '77'),
  new Branch('Україна', 'Львів', 'Чорновола', '10Б'),
  new Branch('США', 'Нью-Йорк', '5th Avenue', '821'),
  new Branch('Україна', 'Одеса', 'Дерибасівська', '3'),
]

const itAngelsServices = [
  new Service('Розробка лендінгу', 150, 4 * 7),
  new Service('Розробка блогу', 300, 8 * 7),
  new Service('Розробка додатка', 600, 16 * 6),
  new Service('Реалізація інтернет-магазину', 450, 10 * 7),
  new Service('SEO-оптимізація (базовий пакет)', 50, 3 * 4 * 7),
  new Service('SEO-оптимізація (розширений пакет)', 120, 6 * 4 * 7),
  new Service('Розробка мобільного додатку (iOS/Android)', 800, 12 * 7),
  new Service('Веб-дизайн (розробка макету)', 80, 2 * 7),
  new Service('Консультація з веб-розробки', 15, 1),
]

try {
  const itAngels = new Company(
    'IT Angels',
    { month: 4, year: 2010 },
    itAngelsServices,
    itAngelsBranches,
  )

  console.log(itAngels.companyAge)
  console.log(itAngels.getBranchesByCity('Львів'))
  console.log(itAngels.getServicesByCostDollarsDurationDays(300, 30 * 6))
  console.log(String(itAngels))
} catch (error) {
  console.error('Caught', error)
}
