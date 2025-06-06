import CatCardManager from './cat_card_manager.js'

const cardManager = new CatCardManager({
  amount: 6,
  imgSrc: './images/placeholder_image.webp',
})

cardManager.render('.js-app')
