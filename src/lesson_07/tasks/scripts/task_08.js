/**
 * Create HTML banner
 *
 * @param {string} title banner title
 * @param {string} description banner description
 * @param {string} linkUrl where banner point
 * @param {string} imgUrl banner image
 * @param {string} [imgAlt=''] accessability text
 * @returns {string} HTML string
 */
function createBanner(title, description, linkUrl, imgUrl, imgAlt = '') {
  return `
    <a
      class="c-banner"
      href="${linkUrl}"
      target="_blank"
    >
      <article class="c-banner__inner">
        <h3 class="c-banner__title">${title}</h3>
        <div class="c-banner__text-group">
          <p>${description}</p>
        </div>
        <div class="c-banner__frame">
          <img class="c-banner__img" src="${imgUrl}" alt="${imgAlt}" />
        </div>
      </article>
    </a>
    `
}

const JS_DESCRIPTION =
  'Ви прагнете стати програмістом frontend-розробником, опанувати функціональне програмування, основи ООП та вивчити мову програмування JavaScript? Тоді цей курс для вас!'
const jsBanner = createBanner(
  'Курс по JavaScript',
  JS_DESCRIPTION,
  'https://edu.fls.guru/js.html',
  './images/js.webp',
)

const VUE_DESCRIPTION =
  'Ви прагнете стати програмістом frontend-розробником, опанувати популярний фреймворк VueJS та розробляти повноцінні web-додатки? Тоді цей курс для вас!'
const vueBanner = createBanner(
  'Курс по Vue.js',
  VUE_DESCRIPTION,
  'https://edu.fls.guru/vuejs.html',
  './images/vuejs.webp',
)

document.write('<div class="u-flex u-flex-wrap u-gap-800">')
document.write('<div style="flex-basis: 20rem; display: grid;">')
document.write(jsBanner)
document.write('</div>')
document.write('<div style="flex-basis: 20rem; display: grid;">')
document.write(vueBanner)
document.write('</div>')
document.write('</div>')
