const localStorage = window.localStorage

export default {
  name: 'storage',

  /**
   * save value(Object) to key
   * @param {string} key é”®
   * @param {Object} value å€¼
   */
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  /**
   * get value(Object) by key
   * @param {string} key é”®
   * @return {Object}
   */
  get (key) {
    return JSON.parse(localStorage.getItem(key)) || null
  },

  /**
   * remove key from localStorage
   * @param {string} key é”®
   */
  remove (key) {
    localStorage.removeItem(key)
  },
  /**
   * clear all
   */
  clear () {
    localStorage.clear()
  }
}
