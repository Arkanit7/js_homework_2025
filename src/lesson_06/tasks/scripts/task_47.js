for (let a = 10; a <= 99; a++) {
  for (let b = 10; b <= 99; b++) {
    const ab = a * 100 + b

    if (ab % 99) continue

    const ba = b * 100 + a

    if (ba % 49) continue

    document.write(`A = ${a}; B = ${b}.`)
  }
}
