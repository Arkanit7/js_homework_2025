'use strict'

/** @type {(from: number, to: number) => number} */
function generateIntegerInRange(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

/**
 * Represents a banner manager that handles a list of site banners and
 * provides functionality to display random banners without immediate
 * repetition.
 */
class Banner {
  /** @param {SiteBanner[]} bannersList */
  constructor(bannersList) {
    this.bannersList = bannersList
    this.bannersAmount = bannersList.length
    /** @type {number[]} */
    this.usedIndexes = []
  }

  getRandomBanner() {
    // exclude banner repetition
    if (this.usedIndexes.length === this.bannersAmount) this.usedIndexes = []

    let randomIndex

    do {
      randomIndex = generateIntegerInRange(0, this.bannersAmount - 1)
    } while (this.usedIndexes.includes(randomIndex))

    this.usedIndexes.push(randomIndex)

    return this.bannersList[randomIndex]
  }

  renderRandomBanners(times = 1) {
    for (let i = 0; i < times; i++) {
      const {href, imgSrc, imgAlt} = this.getRandomBanner()

      document.write(`
        <a class="u-inline-block u-p-400 u-bg-stone-200 u-rounded-lg u-border-zinc-800 u-text-zinc-800" href="${href}" title="${imgAlt}">
          <img class="u-is-4000" src="${imgSrc}" alt="${imgAlt}">
        </a>
      `)
    }
  }
}

class SiteBanner {
  /**
   * @param {string} href - A link, to which the banner will lead.
   * @param {string} imgSrc - A source for the image file.
   * @param {string} imgAlt - An alternative accessability text for the image.
   */
  constructor(href, imgSrc, imgAlt) {
    this.href = href
    this.imgSrc = imgSrc
    this.imgAlt = imgAlt
  }
}

/** @type {SiteBanner[]} */
const jsBanners = [
  new SiteBanner(
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'https://cdn.simpleicons.org/javascript',
    'JavaScript',
  ),
  new SiteBanner(
    'https://nodejs.org/',
    'https://cdn.simpleicons.org/nodedotjs',
    'Node.js',
  ),
  new SiteBanner(
    'https://www.npmjs.com/',
    'https://cdn.simpleicons.org/npm',
    'npm',
  ),
  new SiteBanner(
    'https://yarnpkg.com/',
    'https://cdn.simpleicons.org/yarn',
    'Yarn',
  ),
  new SiteBanner(
    'https://webpack.js.org/',
    'https://cdn.simpleicons.org/webpack',
    'Webpack',
  ),
  new SiteBanner(
    'https://rollupjs.org/',
    'https://cdn.simpleicons.org/rollupdotjs',
    'Rollup.js',
  ),
  new SiteBanner(
    'https://vercel.com/',
    'https://cdn.simpleicons.org/vercel',
    'Vercel',
  ),
  new SiteBanner(
    'https://react.dev/',
    'https://cdn.simpleicons.org/react',
    'React',
  ),
  new SiteBanner(
    'https://vuejs.org/',
    'https://cdn.simpleicons.org/vuedotjs',
    'Vue.js',
  ),
  new SiteBanner(
    'https://angular.io/',
    'https://cdn.simpleicons.org/angular',
    'Angular',
  ),
  new SiteBanner(
    'https://expressjs.com/',
    'https://cdn.simpleicons.org/express',
    'Express',
  ),
  new SiteBanner(
    'https://nestjs.com/',
    'https://cdn.simpleicons.org/nestjs',
    'NestJS',
  ),
  new SiteBanner(
    'https://socket.io/',
    'https://cdn.simpleicons.org/socketdotio',
    'Socket.IO',
  ),
  new SiteBanner(
    'https://jestjs.io/',
    'https://cdn.simpleicons.org/jest',
    'Jest',
  ),
  new SiteBanner(
    'https://mochajs.org/',
    'https://cdn.simpleicons.org/mocha',
    'Mocha',
  ),
  new SiteBanner(
    'https://www.cypress.io/',
    'https://cdn.simpleicons.org/cypress',
    'Cypress',
  ),
  new SiteBanner(
    'https://eslint.org/',
    'https://cdn.simpleicons.org/eslint',
    'ESLint',
  ),
  new SiteBanner(
    'https://prettier.io/',
    'https://cdn.simpleicons.org/prettier',
    'Prettier',
  ),
  new SiteBanner(
    'https://www.typescriptlang.org/',
    'https://cdn.simpleicons.org/typescript',
    'TypeScript',
  ),
  new SiteBanner(
    'https://babeljs.io/',
    'https://cdn.simpleicons.org/babel',
    'Babel',
  ),
  new SiteBanner(
    'https://jquery.com/',
    'https://cdn.simpleicons.org/jquery',
    'jQuery',
  ),
  new SiteBanner(
    'https://lodash.com/',
    'https://cdn.simpleicons.org/lodash',
    'Lodash',
  ),
  new SiteBanner(
    'https://handlebarsjs.com/',
    'https://cdn.simpleicons.org/handlebarsdotjs',
    'Handlebars.js',
  ),
  new SiteBanner(
    'https://sequelize.org/',
    'https://cdn.simpleicons.org/sequelize',
    'Sequelize',
  ),
  new SiteBanner(
    'https://mongoosejs.com/',
    'https://cdn.simpleicons.org/mongoose',
    'Mongoose',
  ),
]

const jsBannersFactory = new Banner(jsBanners)

document.write('<div class="u-flex u-gap-200 u-flex-wrap">')
jsBannersFactory.renderRandomBanners(3)
document.write('</div>')
