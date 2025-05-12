'use strict'

class Author {
  /**
   * @param {string} name
   * @param {number} year
   */
  constructor(name, year) {
    this.name = name
    this.year = year
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    return hint === 'string'
      ? `автор: ${this.name}, рік народження: ${this.year}`
      : this.year
  }
}

class Book {
  /**
   * @param {string} title
   * @param {number} year
   * @param {number} price
   * @param {Author} author
   */
  constructor(title, year, price, author) {
    this.title = title
    this.year = year
    this.price = price
    this.author = author
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    return hint === 'string'
      ? `книга ${this.title}, опубліковано: ${this.year}, ціна: ${this.price}, ${this.author}`
      : this.year
  }
}

class BookManager {
  /** @param {Book[]} bookList */
  constructor(bookList) {
    this.bookList = bookList
  }

  /** @return {Map<Author, number>} */
  getTotalPriceByAuthor() {
    const priceByAuthor = new Map()

    for (const {author, price} of this.bookList) {
      priceByAuthor.set(author, (priceByAuthor.get(author) ?? 0) + price)
    }

    return priceByAuthor
  }

  *[Symbol.iterator]() {
    for (const book of this.bookList) yield book
  }
}

// =============================================================================

function printSection(title, list, cssSelector, className = '') {
  const headerEl = document.createElement('H3')
  headerEl.textContent = title

  const listEl = document.createElement('UL')

  for (const item of list) {
    const liEl = document.createElement('LI')
    liEl.textContent = item

    listEl.append(liEl)
  }

  const sectionEl = document.createElement('SECTION')
  sectionEl.className = className
  sectionEl.append(headerEl, listEl)

  const containerEl = document.querySelector(cssSelector)
  containerEl.append(sectionEl)
}

// =============================================================================

const authors = {
  rowling: new Author('Джоан Роулінг', 1965),
  martin: new Author('Джордж Мартін', 1948),
  murakami: new Author('Харукі Муракамі', 1949),
  king: new Author('Стівен Кінг', 1947),
  gaiman: new Author('Ніл Ґейман', 1960),
  atwood: new Author('Маргарет Етвуд', 1939),
  allende: new Author('Ісабель Альєнде', 1942),
}

const bookList = [
  new Book('Гаррі Поттер і філософський камінь', 1997, 250, authors.rowling),
  new Book('Гаррі Поттер і таємна кімната', 1998, 260, authors.rowling),
  new Book('Гра престолів', 1996, 300, authors.martin),
  new Book('Битва королів', 1998, 310, authors.martin),
  new Book('Норвезький ліс', 1987, 200, authors.murakami),
  new Book('Кафка на пляжі', 2002, 230, authors.murakami),
  new Book('1Q84', 2009, 280, authors.murakami),
  new Book('Сяйво', 1977, 270, authors.king),
  new Book('Воно', 1986, 320, authors.king),
  new Book('Керрі', 1974, 210, authors.king),
  new Book('Американські боги', 2001, 260, authors.gaiman),
  new Book('Кораліна', 2002, 190, authors.gaiman),
  new Book('Оповідь служниці', 1985, 240, authors.atwood),
  new Book('Орикс і Деркач', 2003, 250, authors.atwood),
  new Book('Аліса Ґрейс', 1996, 230, authors.atwood),
  new Book('Дім духів', 1982, 220, authors.allende),
  new Book('Про любов і тінь', 1984, 210, authors.allende),
  new Book('Дочка фортуни', 1999, 250, authors.allende),
  new Book('Заповіти', 2019, 270, authors.atwood),
  new Book('Зловіщі сни', 2001, 300, authors.king),
]

const bookStore = new BookManager(bookList)
const totalPriceByAuthor = bookStore.getTotalPriceByAuthor()

const authorToPrice = [...totalPriceByAuthor].map(
  ([author, price]) => `${author.name} – ${price} грн.`,
)
printSection('Сумарна ціна за автором', authorToPrice, '.js-app', 'u-flow-300')

printSection('Усі книги', bookStore, '.js-app', 'u-flow-300')
