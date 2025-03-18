const NEWS_URL = 'https://www.ukr.net/'
const DELAY = 20 * 1e3 // 20 s

if (confirm('Почати тестування?')) {
  const redirectNow = confirm('Будете читати новини?')

  if (redirectNow) window.location.href = NEWS_URL
  else setTimeout(() => (window.location.href = NEWS_URL), DELAY)
}
