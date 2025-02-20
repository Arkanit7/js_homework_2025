const IMAGE_URL_ONE = './images/cat_one.webp'
const IMAGE_URL_TWO = './images/cat_two.webp'
const IMAGE_URL_THREE = './images/cat_three.webp'
const IMAGE_URL_FOUR = './images/cat_four.webp'

/**
 * Insert one of four provided images
 *
 * @param {string} url1
 * @param {string} url2
 * @param {string} url3
 * @param {string} url4
 */
function insertImage(url1, url2, url3, url4) {
  const imageNumber = 1 + Math.floor(Math.random() * (4 - 1 + 1))
  let urlToUse

  switch (imageNumber) {
    case 1:
      urlToUse = url1
      break
    case 2:
      urlToUse = url2
      break
    case 3:
      urlToUse = url3
      break
    case 4:
      urlToUse = url4
      break
  }

  document.write(`<img src="${urlToUse}" alt="Кіт">`)
}

insertImage(IMAGE_URL_ONE, IMAGE_URL_TWO, IMAGE_URL_THREE, IMAGE_URL_FOUR)
