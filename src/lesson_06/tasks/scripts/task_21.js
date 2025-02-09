if (confirm('Почати тестування?')) {
  let crates = parseInt(prompt('Скільки ящиків з яблуками є на складі?', '15'))
  let vehicleCount = 1

  do {
    const load = parseInt(
      prompt(
        `Є ${crates} ящиків. \nСкільки вантажити на машину №${vehicleCount} ?`,
        '5',
      ),
    )

    if (load > crates) {
      alert(`${load}?! На складі так багато нема!`)
      continue
    }

    crates -= load
    vehicleCount++
  } while (crates > 0)

  alert(`Усі ${vehicleCount - 1} машин поїхали, а склад спорожнів...`)
}
