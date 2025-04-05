'use strict'

/** Represents a manufacturer with a name and registration number. */
class Manufacturer {
  /**
   * @param {Object} params
   * @param {string} params.name
   * @param {string} params.registrationNumber
   */
  constructor({name, registrationNumber}) {
    this.name = name
    this.registrationNumber = registrationNumber
  }

  toString() {
    return `Manufacturer "${this.name}", reg: #${this.registrationNumber}.`
  }
}

/** Represents a product with specific details. */
class Product {
  #amount

  /**
   * @param {Object} params - The parameters for the product.
   * @param {string} params.title - The title or name of the product.
   * @param {string} params.measurement - The unit of measurement for the product.
   * @param {number} params.amount - The quantity of the product.
   * @param {Manufacturer} params.manufacturer - The manufacturer of the product.
   */
  constructor({title, measurement, amount, manufacturer}) {
    this.title = title
    this.measurement = measurement
    this.amount = amount
    this.manufacturer = manufacturer
  }

  get amount() {
    return this.#amount
  }

  set amount(newAmount) {
    if (newAmount < 0) throw new Error("An amount can't be negative.")

    this.#amount = newAmount
  }

  toString() {
    return `Product "${this.title}", ${this.measurement}(s) * ${this.amount}, made by "${this.manufacturer.name}".`
  }
}

/** Represent a store with methods to add, find & delete products */
class Store {
  /**
   * @param {string} title - A name of the store.
   */
  constructor(title) {
    this.title = title
    /** @type {{ id: number, data: Product }[]} */
    this.productList = []
  }

  /** @param {Product} product */
  isProductRegistered(product) {
    return !!this.productList.find(({data}) => data === product)
  }

  /** @param {Product} product */
  addProduct(product) {
    if (this.isProductRegistered(product))
      throw new Error(`The product ${product} is already here.`)

    this.productList.push({
      id: new Date().getTime(),
      data: product,
    })
  }

  /**
   * @param {Product} product
   */
  removeProduct(product) {
    const productIndex = this.productList.findIndex(
      ({data}) => data === product,
    )

    if (productIndex === -1) throw new Error(`There's no ${product.title}.`)

    this.productList.splice(productIndex, 1)
  }

  /**
   * @param {number} productId
   */
  removeProductById(productId) {
    const productIndex = this.productList.findIndex(({id}) => id === productId)

    if (productIndex === -1)
      throw new Error(`There's no product with the "${productId}" id.`)

    this.productList.splice(productIndex, 1)
  }

  /**
   * @param {string} productTitle
   */
  removeProductsByTitle(productTitle) {
    this.productList = this.productList.filter(
      ({data: {title}}) => title !== productTitle,
    )
  }

  /**
   * @param {string} productTitle
   */
  getProductsByTitle(productTitle) {
    return this.productList.filter(({data: {title}}) => title === productTitle)
  }

  /**
   * @param {string} manufacturerName
   */
  getProductsByManufacturer(manufacturerName) {
    return this.productList.filter(
      ({
        data: {
          manufacturer: {name},
        },
      }) => name === manufacturerName,
    )
  }

  toString() {
    return (
      `Store "${this.title}"\n` +
      this.productList.map(({data}) => data).join('\n')
    )
  }
}

// Create some manufacturers
const acmeCorp = new Manufacturer({
  name: 'Acme Corp',
  registrationNumber: 'ACME12345',
})
const betaIndustries = new Manufacturer({
  name: 'Beta Industries',
  registrationNumber: 'BETA67890',
})
const gammaLtd = new Manufacturer({
  name: 'Gamma Ltd',
  registrationNumber: 'GAMMA11223',
})

// Create 10 products
const productList = [
  new Product({
    title: 'Laptop Model X',
    measurement: 'unit',
    amount: 50,
    manufacturer: acmeCorp,
  }),
  new Product({
    title: 'Smartphone Z',
    measurement: 'unit',
    amount: 100,
    manufacturer: betaIndustries,
  }),
  new Product({
    title: 'Gaming Mouse',
    measurement: 'unit',
    amount: 200,
    manufacturer: acmeCorp,
  }),
  new Product({
    title: 'Mechanical Keyboard',
    measurement: 'unit',
    amount: 150,
    manufacturer: gammaLtd,
  }),
  new Product({
    title: '4K Monitor',
    measurement: 'unit',
    amount: 75,
    manufacturer: betaIndustries,
  }),
  new Product({
    title: 'Wireless Headphones',
    measurement: 'unit',
    amount: 120,
    manufacturer: acmeCorp,
  }),
  new Product({
    title: 'Tablet Pro',
    measurement: 'unit',
    amount: 60,
    manufacturer: gammaLtd,
  }),
  new Product({
    title: 'Smartwatch Lite',
    measurement: 'unit',
    amount: 90,
    manufacturer: betaIndustries,
  }),
  new Product({
    title: 'USB-C Cable (1m)',
    measurement: 'unit',
    amount: 500,
    manufacturer: acmeCorp,
  }),
  new Product({
    title: 'Portable SSD (1TB)',
    measurement: 'unit',
    amount: 30,
    manufacturer: gammaLtd,
  }),
]

// ---

const telemart = new Store('Telemart')

productList.forEach((product) => telemart.addProduct(product))
console.log('Products in the store', telemart.productList)
telemart.removeProductsByTitle('Mechanical Keyboard')
console.log('Products in the store', telemart.productList)
console.log(
  `Is the product "${productList[3].title}" inside:`,
  telemart.isProductRegistered(productList[3]),
)
console.log(
  `Is the product "${productList[0].title}" inside:`,
  telemart.isProductRegistered(productList[0]),
)
console.log('Product "Tablet Pro"', telemart.getProductsByTitle('Tablet Pro'))
telemart.removeProduct(productList[5])
console.log('Product "4K Monitor"', telemart.getProductsByTitle('4K Monitor'))
console.log(
  'Products by manufactured "Gamma Ltd"',
  telemart.getProductsByManufacturer('Gamma Ltd'),
)
console.log(String(telemart))
