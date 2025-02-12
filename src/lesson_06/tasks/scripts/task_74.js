if (confirm('Почати тестування?')) {
  document.write(`Усього кубів: ${4 ** 6}!`)

  document.write(`<div class="l-cubes u-mbs-600">`)

  for (let back = 0; back < 4; back++) {
    for (let left = 0; left < 4; left++) {
      for (let bottom = 0; bottom < 4; bottom++) {
        for (let top = 0; top < 4; top++) {
          for (let right = 0; right < 4; right++) {
            for (let front = 0; front < 4; front++) {
              document.write(`
                <div class="l-cubes__item">
                  <div class="c-cube">
                    <div class="c-cube__side c-cube__side--face--front c-cube__side--background--${front}"></div>
                    <div class="c-cube__side c-cube__side--face--back c-cube__side--background--${back}"></div>
                    <div class="c-cube__side c-cube__side--face--left c-cube__side--background--${left}"></div>
                    <div class="c-cube__side c-cube__side--face--right c-cube__side--background--${right}"></div>
                    <div class="c-cube__side c-cube__side--face--top c-cube__side--background--${top}"></div>
                    <div class="c-cube__side c-cube__side--face--bottom c-cube__side--background--${bottom}"></div>
                  </div>
                </div>`)
            }
          }
        }
      }
    }
  }

  document.write(`</div>`)
}
