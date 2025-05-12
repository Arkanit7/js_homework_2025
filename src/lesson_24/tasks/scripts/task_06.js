'use strict'

class Visitor {
  /**
   * @param {Visitor[]} visitorList
   * @returns {Map<Visitor, number>}
   */
  static getVisits(visitorList) {
    const visitCounter = new Map()

    for (const visitor of visitorList) {
      visitCounter.set(visitor, (visitCounter.get(visitor) ?? 0) + 1)
    }

    return visitCounter
  }

  /**
   * @param {string} login
   * @param {Date} registrationDate
   */
  constructor(login, registrationDate) {
    this.login = login
    this.registrationDate = registrationDate
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string')
      return `відвідувач ${this.login}, час візиту: ${this.registrationDate.toLocaleDateString('uk-UA')}`
    return this.registrationDate.getTime()
  }
}

// =============================================================================

const visitorList = [
  new Visitor('ivan23', new Date('2024-12-01')),
  new Visitor('oksana_l', new Date('2025-01-15')),
  new Visitor('admin', new Date('2025-05-01')),
  new Visitor('tester007', new Date('2025-04-30')),
  new Visitor('guest42', new Date('2025-03-17')),
  new Visitor('marta_k', new Date('2024-11-25')),
  new Visitor('user101', new Date('2025-02-10')),
  new Visitor('oleksii_dev', new Date('2025-05-05')),
  new Visitor('natalka88', new Date('2024-10-19')),
  new Visitor('bot42', new Date('2025-01-01')),
]

const visitList = visitorList
  .toSorted(() => Math.random() - 0.5)
  .slice(2, -2)
  .concat(visitorList.toSorted(() => Math.random() - 0.5).slice(3, -3))
const visitCounter = Visitor.getVisits(visitList)

console.log('%cКількість відвідувань', 'font-size: 1.25rem;')
for (const [{login}, visits] of visitCounter) {
  console.log(`${login} - ${visits}`)
}
