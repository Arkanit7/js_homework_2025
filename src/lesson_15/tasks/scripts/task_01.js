'use strict'

/** @param {number} size - The size of the field. */
function generateField(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 2))
}

/**
 * @constructor
 * @param {number} size - The size of the shooting range field.
 */
function ShootingRange(size, tileIcon = '🌿', targetIcon = '🐇') {
  this.field = generateField(size)
  this.tileIcon = tileIcon
  this.targetIcon = targetIcon
}

/** @type {(position: number) => this} */
ShootingRange.prototype.shoot = function (position) {
  if (position < 0 || position >= this.field.length)
    throw new Error('Invalid shot position!')

  if (this.field[position] === 1) {
    this.field[position] = 0
    console.log('В яблучко!')
  } else console.log('Промах.')

  return this
}

ShootingRange.prototype.displayField = function () {
  const display = this.field.reduce(
    (concatTile, tile) =>
      tile === 0 ? concatTile + this.tileIcon : concatTile + this.targetIcon,
    '',
  )

  console.info('Поточний стан поля:')
  console.log(display)

  return this
}

const rabbitShootingRange = new ShootingRange(10)

rabbitShootingRange.displayField().shoot(0).displayField()
