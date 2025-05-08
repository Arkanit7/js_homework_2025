import {purgeCSSPlugin as purgecss} from '@fullhuman/postcss-purgecss'
import postcssSortMediaQueries from 'postcss-sort-media-queries'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    purgecss({
      content: ['./src/**/*.{pug,html}', './src/**/*.js'],
      safelist: {
        standard: [
          /^receipt/,
          /^c-cube/,
          /^l-cubes/,
          /^u-border-red/,
          /^u-border-blue/,
          /^u-text-pink/,
          /^u-text-blue/,
          /^c-badge-product--type--/,
          /\d\/\d/,
          'textarea',
        ],
      },
    }),
    postcssSortMediaQueries,
    autoprefixer({
      // grid: true,
      // overrideBrowserslist: ["last 3 versions"],
      // cascade: true,
    }),
    cssnano({
      preset: 'default',
    }),
  ],
}
