export default class CataasAPI {
  static API_KEY = 'https://cataas.com/'

  /** @param {string} endPoint */
  static async #getURL(endPoint) {
    const resp = await fetch(CataasAPI.API_KEY + endPoint)

    if (!resp.ok) throw new Error(`${resp.status} – bad response.`)

    const blob = await resp.blob()

    return URL.createObjectURL(blob)
  }

  static getCat() {
    return this.#getURL('cat')
  }

  /** @param {string} text */
  static getCatSays(text) {
    return this.#getURL(`cat/says/${text}`)
  }
}
