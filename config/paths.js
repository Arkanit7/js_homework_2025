const srcFolder = './src/'
const buildFolder = './dist/'

const paths = {
  src: {
    html: [`${srcFolder}**/*.pug`, `!${srcFolder}**/_*.pug`],
    css: [`${srcFolder}**/*.s[ac]ss`, `!${srcFolder}**/_*.s[ac]ss`],
    js: [`${srcFolder}**/*.js`, `!${srcFolder}**/_*.js`],
    img: `${srcFolder}**/*.{svg,png,jpg,ico,webp,avif,gif}`,
  },
  watch: {
    html: `${srcFolder}**/*.pug`,
    css: `${srcFolder}**/*.scss`,
    js: `${srcFolder}**/*.js`,
    img: `${srcFolder}**/*.{svg,png,jpg,ico,webp,avif,gif}`,
  },
  dist: {
    html: `${buildFolder}`,
    css: `${buildFolder}`,
    js: `${buildFolder}`,
    img: `${buildFolder}`,
  },
  clean: buildFolder,
  srcFolder,
  buildFolder,
}

export default paths
