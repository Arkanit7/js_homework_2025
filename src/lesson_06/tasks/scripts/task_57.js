const dailyIncrease =
  parseFloat(
    prompt(
      'Введіть на скільки % більше пробігав спортсмен щодня (0-50%):',
      '10%',
    ),
  ) / 100
let day = 1
let distance = 0
const MILESTONE = 200
const FIRST_DAY_DISTANCE = 10

document.write(`
  <table>
    <thead>
      <tr>
        <th>
          День
        </th>
        <th>
          Подолав за день, км.
        </th>
        <th>
          Загальна відстань, км.
        </th>
      </tr>
    </thead>
    <tbody>
`)

for (
  let dailyRange = FIRST_DAY_DISTANCE;
  distance < MILESTONE;
  day++, dailyRange *= 1 + dailyIncrease
) {
  distance += dailyRange
  document.write(`
      <tr>
        <td>
          ${day}
        </td>
        <td>
          ${dailyRange.toFixed(2)}
        </td>
        <td>
          ${distance.toFixed(2)}
        </td>
      </tr>
  `)
}

document.write(`
    </tbody>
  </table>
`)

document.write(`<p>Спортсмен пробіг ${distance.toFixed(2)} км.`)
document.write(`<p>${MILESTONE} км. було подолано на ${day - 1} день`)
