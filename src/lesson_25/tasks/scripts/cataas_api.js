export default class CataasAPI {
  static API_KEY = 'https://cataas.com/'

  /** @param {string} endPoint */
  static async #getURL(endPoint) {
    try {
      const resp = await fetch(CataasAPI.API_KEY + endPoint)
      const blob = await resp.blob()

      return URL.createObjectURL(blob)
    } catch (error) {
      console.error(error)
    }
  }

  static getCat() {
    return this.#getURL('cat')
  }

  /** @param {string} text */
  static getCatSays(text) {
    return this.#getURL(`cat/says/${text}`)
  }
}
