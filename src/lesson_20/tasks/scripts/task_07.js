'use strict'

class Product {
  constructor(data) {
    const requiredKeys = [
      'id',
      'title',
      'link',
      'imgSrc',
      'amount',
      'amountAvailable',
      'price',
    ]

    for (const key of requiredKeys) {
      if (!(key in data)) throw new TypeError(`Missing field "${key}".`)
    }

    Object.assign(this, data)
  }
}

class Counter {
  static events = {
    change: 'counter:change',
  }

  #value
  minValue
  maxValue
  inputEl
  minusBtn
  plusBtn
  $el

  constructor(value, minValue = 1, maxValue = Infinity, options = {}) {
    this.minValue = minValue
    this.maxValue = maxValue
    this.value = value

    this.options = {
      baseClass: 'u-flex u-gap-100',
      btnClass:
        'c-button | u-flex-none u-inline-grid u-place-content-center u-is-900 u-font-bolder u-leading-none u-text-400',
      valueClass: 'c-input | u-is-1100 u-text-center',
      ...options,
    }
  }

  get value() {
    return this.#value
  }

  set value(newValue) {
    if (!isFinite(newValue)) return

    this.#value =
      newValue >= this.maxValue
        ? this.maxValue
        : newValue <= this.minValue
          ? this.minValue
          : newValue
  }

  changeValueBy(amount = 1) {
    this.value += amount
  }

  dispatchChange() {
    const changeEvent = new CustomEvent(Counter.events.change, {
      detail: {value: this.value},
      bubbles: true,
    })

    this.$el.dispatchEvent(changeEvent)
  }

  updateBtnUI(btnEl, limitValue) {
    btnEl.disabled = this.value === limitValue
  }

  updateUI() {
    this.inputEl.value = String(this.value)
    this.updateBtnUI(this.minusBtn, this.minValue)
    this.updateBtnUI(this.plusBtn, this.maxValue)
  }

  handleValueChange(amount) {
    this.value = amount
    this.updateUI()
    this.dispatchChange()
  }

  handleValueChangeBy(amount = 1) {
    this.changeValueBy(amount)
    this.updateUI()
    this.dispatchChange()
  }

  renderInput() {
    const inputEl = document.createElement('INPUT')
    inputEl.className = this.options.valueClass
    inputEl.type = 'number'
    inputEl.min = String(this.minValue)
    inputEl.max = String(this.maxValue)
    inputEl.step = '1'
    inputEl.addEventListener('change', () =>
      this.handleValueChange(Number(inputEl.value)),
    )

    return inputEl
  }

  renderBtn(label, handleClick) {
    const btnEl = document.createElement('BUTTON')
    btnEl.className = this.options.btnClass
    btnEl.type = 'button'
    btnEl.textContent = label
    btnEl.addEventListener('click', handleClick)

    return btnEl
  }

  render(cssSelector) {
    this.inputEl = this.renderInput()
    this.minusBtn = this.renderBtn('-', () => this.handleValueChangeBy(-1))
    this.plusBtn = this.renderBtn('+', () => this.handleValueChangeBy(1))

    this.updateUI()

    this.$el = document.createElement('DIV')
    this.$el.className = this.options.baseClass
    this.$el.append(this.minusBtn, this.inputEl, this.plusBtn)

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class ProductCard {
  static events = {
    change: 'product:change',
    delete: 'product:delete',
  }

  id
  title
  link
  imgSrc
  amount
  amountAvailable
  price
  options
  priceEl
  deleteBtn
  $el

  constructor(
    {id, title, link, imgSrc, amount, amountAvailable, price},
    options = {},
  ) {
    this.id = id
    this.title = title
    this.link = link
    this.imgSrc = imgSrc
    this.amount = amount
    this.amountAvailable = amountAvailable
    this.price = price

    this.options = {
      baseClass: 'product | u-flow-400 u-pb-400',
      upperContainerClass: 'product__upper | u-flex u-gap-400 u-items-start',
      lowerContainerClass: 'u-flex u-gap-400 u-items-center',
      pictureClass:
        'product__picture | u-is-3/12 u-flex-none u-relative u-aspect-video',
      imgClass: 'u-ibg u-object-contain',
      headerClass: 'product__header | u-text-300 u-flex-auto',
      counterOptions: {},
      priceClass: 'u-text-400 u-text-red-600 u-font-bolder',
      deleteBtnClass:
        'c-button | u-flex-none u-inline-grid u-place-content-center u-is-900 u-font-bolder u-leading-none u-text-400 u-bg-red-600 u-self-start',
      ...options,
    }
  }

  get totalPrice() {
    return this.price * this.amount
  }

  updateUI() {
    this.priceEl.textContent = this.totalPrice.toLocaleString('uk-UA') + ' ₴'
  }

  dispatchEvent(type) {
    const customEvent = new CustomEvent(type, {
      detail: {
        id: this.id,
        amount: this.amount,
      },
      bubbles: true,
    })

    this.$el.dispatchEvent(customEvent)
  }

  handleAmountChange({detail: {value}}) {
    this.amount = value
    this.updateUI()
    this.dispatchEvent(ProductCard.events.change)
  }

  handleProductRemove() {
    this.dispatchEvent(ProductCard.events.delete) // must come before the remove method or there will be no one to hear this 👂
    this.$el.remove()
  }

  renderPicture() {
    const imgEl = document.createElement('IMG')
    imgEl.className = this.options.imgClass
    imgEl.alt = ''
    imgEl.src = this.imgSrc

    const anchorEl = document.createElement('A')
    anchorEl.href = this.link
    anchorEl.className = this.options.pictureClass
    anchorEl.append(imgEl)

    return anchorEl
  }

  renderHeader() {
    const anchorEl = document.createElement('A')
    anchorEl.href = this.link
    anchorEl.textContent = this.title

    const headerEl = document.createElement('H3')
    headerEl.className = this.options.headerClass
    headerEl.append(anchorEl)

    return headerEl
  }

  renderPrice() {
    const priceEl = document.createElement('DIV')
    priceEl.className = this.options.priceClass

    return priceEl
  }

  renderDeleteBtn() {
    const deleteBtn = document.createElement('BUTTON')
    deleteBtn.type = 'button'
    deleteBtn.className = this.options.deleteBtnClass
    deleteBtn.textContent = '✖'
    deleteBtn.addEventListener('click', () => this.handleProductRemove())

    return deleteBtn
  }

  render(cssSelector) {
    const pictureEl = this.renderPicture()
    const headerEl = this.renderHeader()
    this.deleteBtn = this.renderDeleteBtn()

    const upperContainerEl = document.createElement('DIV')
    upperContainerEl.className = this.options.upperContainerClass
    upperContainerEl.append(pictureEl, headerEl, this.deleteBtn)

    const counterEl = new Counter(
      this.amount,
      1,
      this.amountAvailable,
      this.options.counterOptions,
    ).render()
    this.priceEl = this.renderPrice()

    const lowerContainerEl = document.createElement('DIV')
    lowerContainerEl.className = this.options.lowerContainerClass
    lowerContainerEl.append(counterEl, this.priceEl)

    this.$el = document.createElement('ARTICLE')
    this.$el.className = this.options.baseClass
    this.$el.append(upperContainerEl, lowerContainerEl)
    this.$el.addEventListener(Counter.events.change, (e) =>
      this.handleAmountChange(e),
    )

    this.updateUI()

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

class ProductCart {
  productsList
  options
  orderEl
  priceEl
  orderBtn
  $el

  constructor(productsList, options) {
    this.productsList = structuredClone(productsList)
    this.options = {
      baseClass: 'cart | u-flow-400',
      listClass: 'cart__list',
      makeOrderClass:
        'u-flex u-gap-400 u-flex-wrap u-items-center u-bg-zinc-700 u-p-200 u-rounded-lg',
      priceClass: 'u-text-500 u-font-bolder u-text-neutral-50',
      btnClass: 'c-button | u-text-400',
      orderText: 'Оформити замовлення',
      productOptions: {},
      ...options,
    }
  }

  get totalPrice() {
    return this.productsList.reduce(
      (sum, {amount, price}) => amount * price + sum,
      0,
    )
  }

  updateUI() {
    this.priceEl.textContent = `Загалом: ${this.totalPrice.toLocaleString('uk-UA')} ₴`

    this.orderBtn.disabled = this.totalPrice === 0
  }

  handleAmountChange({detail: {id, amount}}) {
    for (const product of this.productsList) {
      if (product.id === id) {
        product.amount = amount
        break
      }
    }
    this.updateUI()
  }

  handleDelete({detail: {id: idToRemove}}) {
    const productIndex = this.productsList.findIndex(
      ({id}) => id === idToRemove,
    )

    if (productIndex === -1) return

    this.productsList.splice(productIndex, 1)
    this.updateUI()
  }

  renderMakeOrderSection() {
    const makeOrderEl = document.createElement('DIV')
    makeOrderEl.className = this.options.makeOrderClass

    const priceEl = document.createElement('DIV')
    priceEl.className = this.options.priceClass

    const orderBtn = document.createElement('BUTTON')
    orderBtn.type = 'button'
    orderBtn.textContent = this.options.orderText
    orderBtn.className = this.options.btnClass

    makeOrderEl.append(priceEl, orderBtn)

    return {orderEl: makeOrderEl, priceEl, orderBtn}
  }

  renderList() {
    const listEl = document.createElement('DIV')
    listEl.className = this.options.listClass

    listEl.addEventListener(ProductCard.events.change, (e) =>
      this.handleAmountChange(e),
    )
    listEl.addEventListener(ProductCard.events.delete, (e) =>
      this.handleDelete(e),
    )

    for (const product of this.productsList) {
      const card = new ProductCard(product, this.options.productOptions)
      listEl.append(card.render())
    }

    return listEl
  }

  render(cssSelector) {
    this.$el = document.createElement('DIV')
    this.$el.className = this.options.baseClass

    const listEl = this.renderList()

    ;({
      orderEl: this.orderEl,
      priceEl: this.priceEl,
      orderBtn: this.orderBtn,
    } = this.renderMakeOrderSection())

    this.$el.append(listEl, this.orderEl)
    this.updateUI()

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }
}

// =============================================================================

const productsList = [
  new Product({
    id: 0,
    title:
      'Монітор 34" Samsung Odyssey G5 C34G55T (LC34G55TWWIXCI) WQHD / VA 1000R Curved / 165Hz / 1ms / 8-Bit / DisplayHDR 10 / G-Sync Compatible / FreeSync Premium / Black eQualizer / Picture-by-Picture',
    link: 'https://hard.rozetka.com.ua/ua/samsung_lc34g55twwixci/p271707421/',
    imgSrc: './images/monitor_samsung.webp',
    amount: 2,
    amountAvailable: 5,
    price: 14199,
  }),
  new Product({
    id: 1,
    title:
      'SSD диск Samsung 990 Pro 4TB M.2 PCIe 4.0 x4 V-NAND 3-bit MLC (MZ-V9P4T0GW)',
    link: 'https://hard.rozetka.com.ua/ua/samsung-mz-v9p4t0gw/p426281556/',
    imgSrc: './images/ssd_samsung.webp',
    amount: 1,
    amountAvailable: 4,
    price: 15199,
  }),
  new Product({
    id: 2,
    title:
      'Відеокарта ASUS PCI-Ex GeForce RTX 5080 ROG Astral OC Edition 16GB GDDR7 (256bit) (2 x HDMI, 3 x DisplayPort) (ROG-ASTRAL-RTX5080-O16G-GAMING)',
    link: 'https://hard.rozetka.com.ua/ua/asus-rog-astral-rtx5080-o16g-gaming/p471415334/',
    imgSrc: './images/graphic_card_asus.webp',
    amount: 1,
    amountAvailable: 2,
    price: 74769,
  }),
  new Product({
    id: 3,
    title:
      'Ноутбук Apple MacBook Air 15.3" M4 16/256GB 2025 (MC7A4UA/A) Sky Blue',
    link: 'https://rozetka.com.ua/ua/apple-mc7a4ua-a/p489486629/',
    imgSrc: './images/notebook_apple.webp',
    amount: 1,
    amountAvailable: 10,
    price: 66499,
  }),
]
const productCart = new ProductCart(productsList)
productCart.render('.js-app')
