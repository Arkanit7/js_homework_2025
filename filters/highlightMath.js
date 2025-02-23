import temml from 'temml'

function math(mathString, options = {}) {
  const { inline = true } = options

  try {
    return temml.renderToString(mathString, { displayMode: !inline })
  } catch (error) {
    console.error('Temml rendering error:', error)
    return `<span style="color:red">Temml rendering error: ${error.message}</span>`
  }
}

export default math
