'use strict'

const websiteVisitTimestamp = Date.now()

document.addEventListener(
  'mousemove',
  () =>
    document
      .querySelector('.js-app')
      .append(((Date.now() - websiteVisitTimestamp) / 1000).toFixed(0) + ' c'),
  {once: true},
)
