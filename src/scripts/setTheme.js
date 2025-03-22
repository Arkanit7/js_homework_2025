function getTheme() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme'))
    return localStorage.getItem('theme') ?? 'light'

  if (window.matchMedia('(prefers-color-scheme: dark)')) return 'dark'

  return 'light'
}

const theme = getTheme()

document.documentElement.classList.toggle('t-dark', theme === 'dark')

localStorage.setItem('theme', theme)
