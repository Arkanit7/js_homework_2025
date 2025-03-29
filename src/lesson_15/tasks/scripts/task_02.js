'use strict'

/**
 * @param {number} value - A number to test.
 * @param {string} label - The text of the error.
 * @throws {Error} If the number is negative.
 */
function ensurePositive(value, label) {
  if (value < 0) throw new Error(`${label} must be a positive number.`)
}

/**
 * @constructor
 * @param {string} brand
 * @param {number} fuelTankVolumeL
 * @param {number} fuelVolumeL
 * @param {number} seatsAmount
 * @param {number} passengersAmount
 */
function Auto(
  brand,
  fuelTankVolumeL,
  fuelVolumeL,
  seatsAmount,
  passengersAmount,
) {
  this.brand = brand

  ensurePositive(fuelTankVolumeL, 'Tank capacity must be a positive number.')
  this.fuelTankVolumeL = fuelTankVolumeL

  this.fuelVolumeL = 0
  this.refuel(fuelVolumeL)

  ensurePositive(seatsAmount, 'Seats amount must be a positive number.')
  this.seatsAmount = seatsAmount

  this.passengersAmount = 0
  this.addPassengers(passengersAmount)
}

/** @type {(liters: number) => this} */
Auto.prototype.refuel = function (liters) {
  ensurePositive(liters, "Can't add a negative amount.")

  const newFuelVolumeL = liters + this.fuelVolumeL

  if (newFuelVolumeL > this.fuelTankVolumeL)
    throw new Error("Can't refuel the tank over it's capacity.")

  ensurePositive(newFuelVolumeL, "Can't empty out the fuel tank over zero.")
  this.fuelVolumeL = newFuelVolumeL

  return this
}

Auto.prototype.displayPassengersAmount = function () {
  console.log(this.passengersAmount)

  return this
}

Auto.prototype.displayFuelAmount = function () {
  console.log(this.fuelVolumeL)

  return this
}

/** @type {(passengersAmountToFit: number) => this} */
Auto.prototype.addPassengers = function (passengersAmountToFit) {
  ensurePositive(passengersAmountToFit, "Can't add a negative amount.")

  const newPassengersAmount = passengersAmountToFit + this.passengersAmount

  if (newPassengersAmount > this.seatsAmount)
    throw new Error("Can't fit that many passengers.")

  this.passengersAmount = newPassengersAmount

  return this
}

/** @type {(passengersAmountToRemove: number) => this} */
Auto.prototype.removePassengers = function (passengersAmountToRemove) {
  ensurePositive(passengersAmountToRemove, "Can't remove a negative amount.")

  if (passengersAmountToRemove > this.passengersAmount)
    throw new Error("Can't remove more passengers than present.")

  this.passengersAmount -= passengersAmountToRemove

  return this
}

// ---

try {
  const bugatti = new Auto('Bugatti Veyron ', 100, 70, 2, 1)

  // Passengers test
  bugatti
    .displayPassengersAmount() // 1
    .addPassengers(1)
    .displayPassengersAmount() // 2
    .removePassengers(2)
    .displayPassengersAmount() // 0

  // Refueling test
  bugatti
    .displayFuelAmount() // 70
    .refuel(20)
    .displayFuelAmount() // 90
    .refuel(10)
    .displayFuelAmount() // 100
} catch (error) {
  console.error('Caught', error)
}
