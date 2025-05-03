'use strict'

console.info(
  '%cЗадача №2',
  'font-size: 2rem; color: royalblue; font-weight: bolder;',
)

console.info(
  'Я підключив скрипт із задачі №1 для доступу до класів Client та GoldenClient',
)
//? Я підключив скрипт із задачі №1 для доступу до класів Client та GoldenClient

class Bank {
  /**
   * @param {Client[]} clientList
   */
  constructor(clientList) {
    if (!clientList.every((client) => client instanceof Client))
      throw new TypeError(
        `Список клієнтів має складатися з екземплярів класу ${Client.name}`,
      )

    this.clientList = clientList
  }

  get regularClientList() {
    return this.clientList.filter(
      (client) => client.constructor.name === Client.name,
    )
  }

  get goldenClientList() {
    return this.clientList.filter(
      (client) => client.constructor.name === GoldenClient.name,
    )
  }

  get totalMoney() {
    return this.clientList.reduce(
      (sum, {accountMoney}) => sum + accountMoney,
      0,
    )
  }
}

// ---

const clients = [
  new Client(101, 'Артур', 500),
  new Client(102, 'Марта', 1200),
  new Client(103, 'Олег', 0),
  new GoldenClient(201, 'Катерина', 300, 1000, 5),
  new GoldenClient(202, 'Іван', 555, 5000, 3),
  new GoldenClient(203, 'Наталя', 2000, 10000, 7),
]

const royalBankOfCanada = new Bank(clients)

console.debug(royalBankOfCanada.regularClientList)
console.debug(royalBankOfCanada.goldenClientList)
console.debug(royalBankOfCanada.totalMoney)
