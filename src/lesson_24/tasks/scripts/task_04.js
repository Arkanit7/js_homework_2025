'use strict'

/** @param {string} text */
function extractTopLevelDomain(text) {
  const regexp =
    /^((?:https?:\/\/(?:www\.)?)|www\.)\w+[\w.-]*\.(?<topLevelDomain>[a-zA-Z0-9]{1,63})(?:[ \w@:%+.~#?&/=-]*)$/
  const match = text.match(regexp)

  return match && match.groups.topLevelDomain
}

/**
 * @param {string[]} urlList
 * @return {Map<string, number>}
 */
function countTopLevelDomains(urlList) {
  //? тут нема потреби у Map, можна використати звичайний об'єкт, але оскільки урок про Map та Set – використаю Map
  const domainsCounter = new Map()

  for (const url of urlList) {
    const topLevelDomain = extractTopLevelDomain(url)

    if (topLevelDomain === null) continue

    domainsCounter.set(
      topLevelDomain,
      (domainsCounter.get(topLevelDomain) ?? 0) + 1,
    )
  }

  return domainsCounter
}

// =============================================================================

const urls = [
  'https://example.ua',
  'https://news.bbc.co.uk',
  'https://openai.org',
  'https://store.google.com',
  'https://github.io',
  'https://university.edu',
  'https://data.gov',
  'https://my-site.net',
  'https://company.co',
  'https://blog.dev',
  'https://example.com/about',
  'https://news.bbc.co.uk/world',
  'https://research.openai.org',
  'https://store.google.com/products',
  'https://pages.github.io',
  'https://admissions.university.edu',
  'https://data.gov/statistics',
  'https://blog.my-site.net',
  'https://portal.company.co',
  'https://dev.blog.dev',
  'http://www.foufos.gr',
  'https://www.foufos.gr',
  'http://foufos.gr',
  'http://www.foufos.gr/kino',
  'http://werer.gr',
  'www.foufos.gr',
  'www.mp3.com',
  'www.t.co',
  'http://t.co',
  'http://www.t.co',
  'https://www.t.co',
  'www.aa.com',
  'http://aa.com',
  'http://www.aa.com',
  'https://www.aa.com',
  'badurlnotvalid://www.google.com',
  'htpp://www.google.com',
]
const topLevelDomainsCounter = countTopLevelDomains(urls)
console.log('Адреси', urls)
console.log('Лічильник доменів', topLevelDomainsCounter)
