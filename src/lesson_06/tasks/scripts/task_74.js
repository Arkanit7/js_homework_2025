if (confirm('Почати тестування?')) {
  document.write(`Усього кубів: ${4 ** 6}!`)

  document.write(`<div class="l-cubes u-mbs-600">`)

  for (let back = 0; back < 4; back++) {
    let backColor

    switch (back) {
      case 0:
        backColor = 'red'
        break
      case 1:
        backColor = 'yellow'
        break
      case 2:
        backColor = 'blue'
        break
      case 3:
        backColor = 'emerald'
        break
    }

    for (let left = 0; left < 4; left++) {
      let leftColor

      switch (left) {
        case 0:
          leftColor = 'red'
          break
        case 1:
          leftColor = 'yellow'
          break
        case 2:
          leftColor = 'blue'
          break
        case 3:
          leftColor = 'emerald'
          break
      }

      for (let bottom = 0; bottom < 4; bottom++) {
        let bottomColor

        switch (bottom) {
          case 0:
            bottomColor = 'red'
            break
          case 1:
            bottomColor = 'yellow'
            break
          case 2:
            bottomColor = 'blue'
            break
          case 3:
            bottomColor = 'emerald'
            break
        }

        for (let top = 0; top < 4; top++) {
          let topColor

          switch (top) {
            case 0:
              topColor = 'red'
              break
            case 1:
              topColor = 'yellow'
              break
            case 2:
              topColor = 'blue'
              break
            case 3:
              topColor = 'emerald'
              break
          }

          for (let right = 0; right < 4; right++) {
            let rightColor

            switch (right) {
              case 0:
                rightColor = 'red'
                break
              case 1:
                rightColor = 'yellow'
                break
              case 2:
                rightColor = 'blue'
                break
              case 3:
                rightColor = 'emerald'
                break
            }

            for (let front = 0; front < 4; front++) {
              let frontColor

              switch (front) {
                case 0:
                  frontColor = 'red'
                  break
                case 1:
                  frontColor = 'yellow'
                  break
                case 2:
                  frontColor = 'blue'
                  break
                case 3:
                  frontColor = 'emerald'
                  break
              }

              document.write(`
                <div class="l-cubes__item">
                  <div class="c-cube">
                    <div class="c-cube__inner">
                      <div class="c-cube__side c-cube__side--face--front c-cube__side--background--${frontColor}"></div>
                      <div class="c-cube__side c-cube__side--face--back c-cube__side--background--${backColor}"></div>
                      <div class="c-cube__side c-cube__side--face--left c-cube__side--background--${leftColor}"></div>
                      <div class="c-cube__side c-cube__side--face--right c-cube__side--background--${rightColor}"></div>
                      <div class="c-cube__side c-cube__side--face--top c-cube__side--background--${topColor}"></div>
                      <div class="c-cube__side c-cube__side--face--bottom c-cube__side--background--${bottomColor}"></div>
                    </div>
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
