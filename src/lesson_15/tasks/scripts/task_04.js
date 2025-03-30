'use strict'

/**
 * @typedef {Object} SiteBanner
 * @property {string} href - A link to the website.
 * @property {string} imgSrc - A path to the image.
 * @property {string} imgAlt - imgAlternative text for the image.
 */

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

  renderRandomBanner(times = 1) {
    for (let i = 0; i < times; i++) {
      const { href, imgSrc, imgAlt } = this.getRandomBanner()

      document.write(`
        <a class="u-inline-block u-p-400 u-bg-stone-200 u-rounded-lg u-border-zinc-800 u-text-zinc-800" href="${href}" title="${imgAlt}">
          <img class="u-is-4000" src="${imgSrc}" alt="${imgAlt}">
        </a>
      `)
    }
  }
}

/** @type {SiteBanner[]} */
const jsNodeBanners = [
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    imgSrc: 'https://cdn.simpleicons.org/javascript',
    imgAlt: 'JavaScript',
  },
  {
    href: 'https://nodejs.org/',
    imgSrc: 'https://cdn.simpleicons.org/nodedotjs',
    imgAlt: 'Node.js',
  },
  {
    href: 'https://www.npmjs.com/',
    imgSrc: 'https://cdn.simpleicons.org/npm',
    imgAlt: 'npm',
  },
  {
    href: 'https://yarnpkg.com/',
    imgSrc: 'https://cdn.simpleicons.org/yarn',
    imgAlt: 'Yarn',
  },
  {
    href: 'https://webpack.js.org/',
    imgSrc: 'https://cdn.simpleicons.org/webpack',
    imgAlt: 'Webpack',
  },
  {
    href: 'https://rollupjs.org/',
    imgSrc: 'https://cdn.simpleicons.org/rollupdotjs',
    imgAlt: 'Rollup.js',
  },
  {
    href: 'https://vercel.com/',
    imgSrc: 'https://cdn.simpleicons.org/vercel',
    imgAlt: 'Vercel',
  },
  {
    href: 'https://react.dev/',
    imgSrc: 'https://cdn.simpleicons.org/react',
    imgAlt: 'React',
  },
  {
    href: 'https://vuejs.org/',
    imgSrc: 'https://cdn.simpleicons.org/vuedotjs',
    imgAlt: 'Vue.js',
  },
  {
    href: 'https://angular.io/',
    imgSrc: 'https://cdn.simpleicons.org/angular',
    imgAlt: 'Angular',
  },
  {
    href: 'https://expressjs.com/',
    imgSrc: 'https://cdn.simpleicons.org/express',
    imgAlt: 'Express',
  },
  {
    href: 'https://nestjs.com/',
    imgSrc: 'https://cdn.simpleicons.org/nestjs',
    imgAlt: 'NestJS',
  },
  {
    href: 'https://socket.io/',
    imgSrc: 'https://cdn.simpleicons.org/socketdotio',
    imgAlt: 'Socket.IO',
  },
  {
    href: 'https://jestjs.io/',
    imgSrc: 'https://cdn.simpleicons.org/jest',
    imgAlt: 'Jest',
  },
  {
    href: 'https://mochajs.org/',
    imgSrc: 'https://cdn.simpleicons.org/mocha',
    imgAlt: 'Mocha',
  },
  {
    href: 'https://www.cypress.io/',
    imgSrc: 'https://cdn.simpleicons.org/cypress',
    imgAlt: 'Cypress',
  },
  {
    href: 'https://eslint.org/',
    imgSrc: 'https://cdn.simpleicons.org/eslint',
    imgAlt: 'ESLint',
  },
  {
    href: 'https://prettier.io/',
    imgSrc: 'https://cdn.simpleicons.org/prettier',
    imgAlt: 'Prettier',
  },
  {
    href: 'https://www.typescriptlang.org/',
    imgSrc: 'https://cdn.simpleicons.org/typescript',
    imgAlt: 'TypeScript',
  },
  {
    href: 'https://babeljs.io/',
    imgSrc: 'https://cdn.simpleicons.org/babel',
    imgAlt: 'Babel',
  },
  {
    href: 'https://jquery.com/',
    imgSrc: 'https://cdn.simpleicons.org/jquery',
    imgAlt: 'jQuery',
  },
  {
    href: 'https://lodash.com/',
    imgSrc: 'https://cdn.simpleicons.org/lodash',
    imgAlt: 'Lodash',
  },
  {
    href: 'https://handlebarsjs.com/',
    imgSrc: 'https://cdn.simpleicons.org/handlebarsdotjs',
    imgAlt: 'Handlebars.js',
  },
  {
    href: 'https://sequelize.org/',
    imgSrc: 'https://cdn.simpleicons.org/sequelize',
    imgAlt: 'Sequelize',
  },
  {
    href: 'https://mongoosejs.com/',
    imgSrc: 'https://cdn.simpleicons.org/mongoose',
    imgAlt: 'Mongoose',
  },
]

const jsBannersFactory = new Banner(jsNodeBanners)

document.write('<div class="u-flex u-gap-200 u-flex-wrap">')
jsBannersFactory.renderRandomBanner(3)
document.write('</div>')
