const integer = parseInt(prompt('Введіть число', '5'))

document.write(`
  <table>
    <tbody>
      <tr>
        <td>
          x
        </td>
        <td>
          <b>
            ${integer}
          </b>
        </td>
      </tr>


`)

for (let number = 1; number <= 9; number++) {
  document.write(`
    <tr>
      <td><b>${number}</b></td>
      <td>${number * integer}</td>
    </tr>
    `)
}

document.write(`
    </tbody>
  </table>
`)
