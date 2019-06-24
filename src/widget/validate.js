const validate = {
  /**
   * @param {string} phone
   * @return {boolean}
   */
  isMobile (text) {
    const pattern = /^1[3-9]\d{9}$/
    return pattern.test(text)
  },
  /**
   * @param {Number || String} text
   * @return {boolean}
   */
  checkNumber (text) {
    const pattern = /^[0-9]+.?[0-9]*$/
    return pattern.test(text)
  },
  /**
   * 邮箱验证
   * @param {String} email
   * @return {boolean}
   */
  isEmail (text) {
    const pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    return pattern.test(text)
  },
  /**
   * @param {String} zipCode
   * @returns {boolean}
   * @example
   * Lizard.isZipCode('430406')
   */
  isZipCode (text){
    var pattern = /^[0-9]{6}$/
    return pattern.test(text)
  }
}

export default validate
