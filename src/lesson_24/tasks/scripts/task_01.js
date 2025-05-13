'use strict'

class PhoneNumber {
  static regexp =
    /^(?:\+?3?8[ -]?)?\(?(?<operatorCode>\d{3})\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/

  static operatorCodesByName = {
    Київстар: ['067', '068', '096', '097', '098', '077'],
    'Vodafone Україна': ['050', '066', '075', '095', '099'],
    Lifecell: ['063', '073', '093'],
    Інтертелеком: ['020', '089', '094'],
    PEOPLEnet: ['092'],
    '3Mob': ['091'],
  }

  /**
   * @param {string} number
   * @returns {string | null}
   */
  static getOperatorCode(number) {
    const match = number.match(PhoneNumber.regexp)

    return match && match.groups.operatorCode
  }

  /**
   * @param {string} number
   * @return {string | null}
   */
  static getOperatorName(number) {
    const operatorCode = PhoneNumber.getOperatorCode(number)

    if (!operatorCode) return null

    const operatorCodesByNameEntries = Object.entries(
      PhoneNumber.operatorCodesByName,
    )

    for (const [operator, codeList] of operatorCodesByNameEntries)
      if (codeList.includes(operatorCode)) return operator

    return null
  }

  #number

  /** @param {string} number */
  constructor(number) {
    this.number = number
  }

  get number() {
    return this.#number
  }

  set number(newNumber) {
    if (typeof newNumber !== 'string')
      throw new TypeError('Phone number must be a string.')
    if (!PhoneNumber.regexp.test(newNumber))
      throw new Error('Invalid phone number.')

    this.#number = newNumber
  }

  get operatorCode() {
    return PhoneNumber.getOperatorCode(this.number)
  }

  set operatorCode(newOperatorCode) {
    if (typeof newOperatorCode !== 'string')
      throw new TypeError('Operator code number must be a string.')

    const newNumber = this.number.replace(this.operatorCode, newOperatorCode)
    this.number = newNumber
  }

  get operatorName() {
    return PhoneNumber.getOperatorName(this.number)
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      const operatorName = this.operatorName || 'не визначено'

      return `${this.number} – (${operatorName})`
    }

    return Number(this.number.replace(/[+() ]/g, ''))
  }
}

class PhoneNumberManager {
  $el
  numberList

  /** @param {string[]} numberList */
  constructor(numberList) {
    this.numberList = numberList.map((number) => new PhoneNumber(number))
  }

  /** @param {string} cssSelector */
  render(cssSelector) {
    this.$el = document.createElement('UL')

    for (const number of this) {
      const liEl = document.createElement('li')
      liEl.textContent = number

      this.$el.append(liEl)
    }

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }

  //? Для практики використаю ітератор, замість зручного генератора
  [Symbol.iterator]() {
    const numberList = this.numberList
    let currentIndex = 0

    return {
      next() {
        if (currentIndex < numberList.length)
          return {
            done: false,
            value: numberList[currentIndex++],
          }

        return {done: true}
      },
    }
  }
}

// =============================================================================

const ukrainianPhoneNumbers = [
  '+38 050 1234567',
  '+38 067 9876543',
  '+38 063 1122334',
  '+380955555555',
  '+38(096)1111111',
  '+38 073 2222222',
  '+38 068 3333333',
  '+380664444444',
  '+38 093 6666666',
  '+38-097-777-7777',
  '+38 044 1234567',
  '+38 032 987 6543',
  '+38 (048) 1122334',
  '+38 057 5555555',
  '+38 056 1111111',
  '+38 050 1122333',
  '+38 067 4455667',
  '+38 063 7788990',
  '+38 095 2233445',
  '+38 096 5566778',
  '+38 073 8899001',
  '+38 068 1237890',
  '+38 066 9871234',
  '+38 093 4567890',
  '+38 097 1230000',
  '+38 044 9998877',
  '+38 032 1112233',
  '+38 048 5554433',
  '+38 057 8887766',
  '+38 056 2223344',
]

try {
  const numberRegistry = new PhoneNumberManager(ukrainianPhoneNumbers)
  numberRegistry.render('.js-app')
} catch (error) {
  console.error(error)
}
