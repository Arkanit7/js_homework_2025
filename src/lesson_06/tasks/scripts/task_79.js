const SQUARES_AMOUNT = 90
const ORIGINAL_SQUARE_SIZE = 30
const DECREASE_RATE = 0.09

let hue = 120
let gap = 2
let currentSize = ORIGINAL_SQUARE_SIZE
let previousSize
let area = 'top'
let insetInlineStart = 'auto'
let insetInlineEnd = 100 - currentSize
let insetBlockStart = 'auto'
let insetBlockEnd = 100 - currentSize
let sizeTopLeft = ORIGINAL_SQUARE_SIZE
let sizeTopRight = 0
let sizeBottomRight = 0
let sizeBottomLeft = 0

for (let cubeCount = 1; cubeCount <= SQUARES_AMOUNT; cubeCount++) {
  document.write(`
  <div
    style="
      inline-size: ${currentSize + '%'};
      inset-inline-start: ${Number(insetInlineStart) ? insetInlineStart + '%' : 'auto'};
      inset-inline-end: ${Number(insetInlineEnd) ? insetInlineEnd + '%' : 'auto'};
      inset-block-start: ${Number(insetBlockStart) ? insetBlockStart + '%' : 'auto'};
      inset-block-end: ${Number(insetBlockEnd) ? insetBlockEnd + '%' : 'auto'};
      background-color: hsl(${hue}deg 100% 50%);
    ">
  </div>
  `)

  previousSize = currentSize
  currentSize *= 1 - DECREASE_RATE
  gap *= 1 - DECREASE_RATE
  hue += 17

  switch (area) {
    case 'top':
      if (insetInlineEnd - currentSize - gap < sizeTopRight) {
        area = 'right'
        insetInlineStart = 100 - insetInlineEnd - previousSize
        sizeTopRight = 100 - insetInlineStart
        insetInlineEnd = 'auto'
      }
      break
    case 'right':
      if (insetBlockEnd - currentSize - gap < sizeBottomRight) {
        area = 'bottom'
        insetBlockStart = 100 - insetBlockEnd - previousSize
        sizeBottomRight = 100 - insetBlockStart
        insetBlockEnd = 'auto'
      }
      break
    case 'bottom':
      if (insetInlineStart - currentSize - gap < sizeBottomLeft) {
        area = 'left'
        insetInlineEnd = 100 - insetInlineStart - previousSize
        sizeBottomLeft = 100 - insetInlineEnd
        insetInlineStart = 'auto'
      }
      break
    case 'left':
      if (insetBlockStart - currentSize - gap < sizeTopLeft) {
        area = 'top'
        insetBlockEnd = 100 - insetBlockStart - previousSize
        sizeTopLeft = 100 - insetBlockEnd
        insetBlockStart = 'auto'
      }
      break
  }

  switch (area) {
    case 'top':
      insetInlineEnd -= gap + currentSize
      break
    case 'right':
      insetBlockEnd -= gap + currentSize
      break
    case 'bottom':
      insetInlineStart -= gap + currentSize
      break
    case 'left':
      insetBlockStart -= gap + currentSize
      break
  }
}
