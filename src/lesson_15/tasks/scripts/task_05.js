'use strict'

/** @type {(from: number, to: number) => number} */
function generateIntegerInRange(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

/**
 * The DanceManager class is responsible for managing a dance event
 * where random pairs of boys and girls are displayed as dancing together.
 */
class DanceManager {
  /**
   * @param {string[]} boys
   * @param {string[]} girls
   */
  constructor(boys, girls) {
    this.boys = boys
    this.girls = girls
    this.interval = null
  }

  getRandomBoy() {
    const randomBoyIndex = generateIntegerInRange(0, this.boys.length - 1)

    return this.boys[randomBoyIndex]
  }

  getRandomGirl() {
    const randomGirlIndex = generateIntegerInRange(0, this.girls.length - 1)

    return this.girls[randomGirlIndex]
  }

  displayDancePair() {
    console.log(`Танцюють ${this.getRandomBoy()} та ${this.getRandomGirl()}!`)
  }

  /**
   * @param {number} [intervalSeconds = 1]
   */
  run(intervalSeconds = 1) {
    if (this.interval) {
      console.warn(`${this.constructor.name} вже запущено.`)
      return
    }

    console.log('Танцювальна вечірка розпочалась! 🕺💃')
    this.interval = setInterval(() => {
      this.displayDancePair()
    }, intervalSeconds * 1000)
  }

  stop() {
    if (this.interval !== null) {
      console.log('Танцювальна вечірка завершилась!')
      clearInterval(this.interval)
      this.interval = null
    }
  }
}

const boys = ['Іван', 'Богдан', 'Андрій', 'Петро', 'Стефан']
const girls = ['Галина', 'Світлана', 'Тетяна', 'Анна', 'Христина']
const privateDanceClub = new DanceManager(boys, girls)

privateDanceClub.run(5)

setTimeout(() => {
  privateDanceClub.stop()
}, 6e4)
