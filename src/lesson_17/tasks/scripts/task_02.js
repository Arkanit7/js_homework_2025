'use strict'

/**
 * The ServiceCar class represents a singleton pattern.
 * It ensures that only one instance of the class is created and reused.
 */
class ServiceCar {
  /** @type {ServiceCar} */
  static #instance

  static get instance() {
    return this.#instance
  }

  /**
   * @param {string} driver
   * @param {string} brand
   * @param {string} licensePlate
   */
  constructor(driver, brand, licensePlate) {
    if (ServiceCar.instance) return ServiceCar.instance

    this.driver = driver
    this.brand = brand
    this.licensePlate = licensePlate

    ServiceCar.#instance = this
  }

  toString() {
    return `Model: ${this.brand}, driver ${this.driver}, license ${this.licensePlate}.`
  }
}

// ---

new ServiceCar('Oksana', 'Daewoo', 'ВС3247АС')
const maybach = new ServiceCar('Boris', 'Mercedes-Benz', 'ВС7777СВ')

console.log(maybach) // Daewoo
