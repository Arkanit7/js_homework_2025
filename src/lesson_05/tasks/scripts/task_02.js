/*
## Алгоритм
ввести кількість елементів ELEMENTS_AMOUNT

відчинити тег form
відчинити тег ul

повторювати ELEMENTS_AMOUNT разів
  - записати li, label та input
  
зачинити тег ul
зачинити тег form
*/

const ELEMENTS_AMOUNT = 10

document.write('<form>')
document.write('<ul>')

for (let i = 1; i <= ELEMENTS_AMOUNT; i++) {
  document.write(
    `<li>
      <label>
        Product # ${i}
        <input type="number" name="product-${i}">
      </label>
    </li>
    `,
  )
}

document.write('</ul>')
document.write('</form>')
