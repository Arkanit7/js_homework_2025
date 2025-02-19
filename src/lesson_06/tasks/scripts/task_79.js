'use strict'

const SQUARES_AMOUNT = 90
const ORIGINAL_SQUARE_SIZE = 30
const DECREASE_RATE = 0.09

let hue = 120
let hueRotate = 17
let gap = 2
let currentSize = ORIGINAL_SQUARE_SIZE
let previousSize
let area = 'top' // в якій чверті квадрат

// позиція квадрата
let leftPosition = 'auto'
let rightPosition = 100 - currentSize
let topPosition = 'auto'
let bottomPosition = 100 - currentSize

// межі для кожної зі сторін
let sizeTopLeft = ORIGINAL_SQUARE_SIZE
let sizeTopRight = 0
let sizeBottomRight = 0
let sizeBottomLeft = 0

for (let cubeCount = 1; cubeCount <= SQUARES_AMOUNT; cubeCount++) {
  document.write(`
  <div
    style="
      inline-size: ${currentSize + '%'};
      inset-inline-start: ${Number(leftPosition) ? leftPosition + '%' : 'auto'};
      inset-inline-end: ${Number(rightPosition) ? rightPosition + '%' : 'auto'};
      inset-block-start: ${Number(topPosition) ? topPosition + '%' : 'auto'};
      inset-block-end: ${Number(bottomPosition) ? bottomPosition + '%' : 'auto'};
      background-color: hsl(${hue}deg 100% 50%);
    ">
  </div>
  `)

  previousSize = currentSize
  currentSize *= 1 - DECREASE_RATE
  gap *= 1 - DECREASE_RATE
  hue += hueRotate

  // обертати квадрат, якщо він вперся у сусідній квадрат
  switch (area) {
    case 'top':
      if (rightPosition - currentSize - gap < sizeTopRight) {
        area = 'right'
        leftPosition = 100 - rightPosition - previousSize
        sizeTopRight = 100 - leftPosition
        rightPosition = 'auto'
      }
      break
    case 'right':
      if (bottomPosition - currentSize - gap < sizeBottomRight) {
        area = 'bottom'
        topPosition = 100 - bottomPosition - previousSize
        sizeBottomRight = 100 - topPosition
        bottomPosition = 'auto'
      }
      break
    case 'bottom':
      if (leftPosition - currentSize - gap < sizeBottomLeft) {
        area = 'left'
        rightPosition = 100 - leftPosition - previousSize
        sizeBottomLeft = 100 - rightPosition
        leftPosition = 'auto'
      }
      break
    case 'left':
      if (topPosition - currentSize - gap < sizeTopLeft) {
        area = 'top'
        bottomPosition = 100 - topPosition - previousSize
        sizeTopLeft = 100 - bottomPosition
        topPosition = 'auto'
      }
      break
  }

  // крок квадрата
  switch (area) {
    case 'top':
      rightPosition -= gap + currentSize
      break
    case 'right':
      bottomPosition -= gap + currentSize
      break
    case 'bottom':
      leftPosition -= gap + currentSize
      break
    case 'left':
      topPosition -= gap + currentSize
      break
  }
}
