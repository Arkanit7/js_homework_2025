// ## Алгоритм Евкліда
// НСД для різниці двох чисел буде спільним для всіх чисел

if (confirm('Почати тестування?')) {
  let firstInteger = parseInt(prompt('Введіть перше число', '105'))
  let secondInteger = parseInt(prompt('Введіть друге число', '252'))

  document.write(`НСД для ${firstInteger} та ${secondInteger} = `)
  firstInteger = Math.abs(firstInteger)
  secondInteger = Math.abs(secondInteger)

  while (firstInteger && secondInteger) {
    const temp = Math.abs(secondInteger - firstInteger)

    secondInteger = firstInteger
    firstInteger = temp
  }

  document.write(firstInteger || secondInteger)
}

// ## варіант 2

// if (confirm('Почати тестування?')) {
//   let firstInteger = parseInt(prompt('Введіть перше число', '105'))
//   let secondInteger = parseInt(prompt('Введіть друге число', '252'))

//   document.write(`НСД для ${firstInteger} та ${secondInteger} = `)
//   firstInteger = Math.abs(firstInteger)
//   secondInteger = Math.abs(secondInteger)

//   while (secondInteger !== 0 && firstInteger !== 0) {
//     if (firstInteger > secondInteger) {
//       firstInteger %= secondInteger
//     } else {
//       secondInteger %= firstInteger
//     }
//   }

//   document.write(firstInteger || secondInteger)
// }
