if (confirm('Почати тестування?')) {
  let textileLength = parseFloat(
    prompt('Введіть довжину тканини у метрах', '100'),
  )

  document.write(`<p>Було ${textileLength} м. тканини`)

  do {
    const toCut = parseFloat(
      prompt(`Є ${textileLength} м.\nСкільки відрізати?`, '70'),
    )

    if (toCut > textileLength) {
      alert(`Матеріалу не вистачає!`)
      continue
    }

    textileLength -= toCut
    document.write(`<p>Ви відрізали ${toCut} м.`)
  } while (textileLength > 0)
}
