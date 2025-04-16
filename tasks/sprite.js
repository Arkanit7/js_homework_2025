import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import cheerio from 'gulp-cheerio'
import paths from '../config/paths.js'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const sprite = () =>
  gulp
    .src(paths.src.svgIcons)
    .pipe(
      plumber(
        notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      svgSprite({
        // shape: {
        //   id: {
        //     // generate custom id
        //     generator(name, file) {
        //       return `icon-${name.replace(/\.svg$/, '')}` // remove .svg file extension
        //     },
        //   },
        // },
        mode: {
          symbol: {
            sprite: '../icons/symbol-defs.svg',
            // prefix: "icon-%s",
            // example: {
            //   dest: `../icons/demo-external-svg.html`,
            // },
          },
        },
      }),
    )
    .pipe(
      cheerio({
        run($) {
          $('[fill]').removeAttr('fill')
          $('[stroke]').removeAttr('stroke')
          $('[style]').removeAttr('style')
        },
        parserOptions: {xmlMode: true},
      }),
    )
    .pipe(gulp.dest(paths.dist.img))

export default sprite
