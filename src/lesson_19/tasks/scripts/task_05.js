'use strict'

class Badge {
  /**
   * @param {string} title
   * @param {'promo' | 'featured' | 'popular'} [type]
   */
  constructor(title, type = 'popular') {
    this.title = title
    this.type = type
  }

  render() {
    const badge = document.createElement('DIV')

    badge.className = 'c-badge-product'
    badge.textContent = this.title

    if (this.type !== 'popular')
      badge.classList.add(`c-badge-product--type--${this.type}`)

    return badge
  }
}

class Product {
  constructor({
    templateSelector,
    href = '#',
    imgSrc,
    imgAlt = '',
    title,
    price,
    badges = [],
  }) {
    this.templateSelector = templateSelector
    this.href = href
    this.imgSrc = imgSrc
    this.imgAlt = imgAlt
    this.title = title
    this.price = price
    this.badges = badges
  }

  /**
   * @param {HTMLElement} productEl
   */
  #renderBadges(productEl) {
    const badgesListEl = productEl.querySelector('.js-product-badges')

    for (const badge of this.badges) {
      const itemEl = document.createElement('LI')

      itemEl.className = 'l-badges-product__item'
      itemEl.append(badge.render())
      badgesListEl.append(itemEl)
    }
  }

  #createFromTemplate() {
    const template = document.querySelector(this.templateSelector)

    if (!(template instanceof HTMLTemplateElement))
      throw new TypeError("Can't find the template.")

    return template.content.firstElementChild.cloneNode(true)
  }

  render() {
    const productEl = this.#createFromTemplate()

    const anchors = productEl.querySelectorAll('.js-product-link')
    for (const a of anchors) {
      // a.setAttribute('href', this.href)
      a.href = this.href
    }

    const imageEl = productEl.querySelector('.js-product-image')
    imageEl.src = this.imgSrc
    imageEl.alt = this.imgAlt

    const titleEl = productEl.querySelector('.js-product-title')
    titleEl.textContent = this.title

    const priceEl = productEl.querySelector('.js-product-price')
    priceEl.textContent = this.price.toLocaleString('uk-UA') + ' ₴'

    this.#renderBadges(productEl)

    return productEl
  }
}

// =============================================================================

/**
 * @param {Event} e
 */
function highlightProduct({target}) {
  const productEl = target.closest('.js-product')

  if (!productEl) return

  productEl.classList.toggle('is-selected')
}

const container = document.querySelector('.js-products')

container?.addEventListener('click', highlightProduct)
// =============================================================================

try {
  const BADGES = {
    promo: new Badge('Акція', 'promo'),
    popular: new Badge('Топ продажів'),
    featured: new Badge('Вибір року', 'featured'),
  }

  const products = [
    new Product({
      templateSelector: '.js-product-template',
      imgSrc: './images/notebook_acer.webp',
      title:
        'Ноутбук Acer Aspire 3 A315-59-51ST (NX.K6SEU.00M) Pure Silver / 15.6" IPS Full HD / Intel Core i5-1235U / RAM 16 ГБ / SSD 512 ГБ /',
      price: 19999,
      badges: [BADGES.promo, BADGES.featured],
    }),
    new Product({
      templateSelector: '.js-product-template',
      imgSrc: './images/notebook_asus.webp',
      title:
        'Ноутбук ASUS TUF Gaming A15 FA506NCR-HN006 (90NR0JV7-M002L0) Graphite Black / 15.6" IPS 144 Гц / AMD Ryzen 7 7435HS / RAM 16 ГБ / SSD 512 ГБ / RTX 3050, 4 ГБ',
      price: 36999,
      badges: [BADGES.popular],
    }),
    new Product({
      templateSelector: '.js-product-template',
      imgSrc: './images/notebook_lenovo.webp',
      title:
        'Ноутбук Lenovo IdeaPad Slim 5 16IRL8 (82XF004MRA) Cloud Grey / 16" IPS WUXGA / Intel Core i7-13620H / RAM 16 ГБ / SSD 512 ГБ / Підсвітка клавіатури / Зарядка через Type-C',
      price: 27999,
    }),
    new Product({
      templateSelector: '.js-product-template',
      imgSrc: './images/notebook_apple.webp',
      title: 'Ноутбук Apple MacBook Air 13" M1 8/256GB 2020 (MGN63) Space Gray',
      price: 34499,
      badges: [BADGES.featured],
    }),
    new Product({
      templateSelector: '.js-product-template',
      imgSrc: './images/notebook_dell.webp',
      title:
        'Ноутбук Dell Vostro 15 3520 Core i5-1235U 10-ядерний/32ГБ/1ТБ/Windows 11 Pro',
      price: 31999,
      badges: [BADGES.popular, BADGES.promo, BADGES.featured],
    }),
    new Product({
      templateSelector: '.js-product-template',
      imgSrc: './images/notebook_hp.webp',
      title:
        'Ноутбук HP Victus Gaming 16-s0017ua (9G9J5EA) Mica Silver / 16.1" IPS Full HD 144 Гц / AMD Ryzen 5 7640HS / RAM 32 ГБ / SSD 512 ГБ / nVidia GeForce RTX 4050, 6 ГБ',
      price: 45999,
      badges: [BADGES.promo],
    }),
  ]

  for (const product of products) {
    container?.append(product.render())
  }
} catch (error) {
  console.error(error)
}
