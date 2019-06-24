import config from '@/config/index'

const utils = {
  ua: navigator.userAgent,
  ios () {
    return this.ua && /iPhone|iPad|iPod/gi.test(this.ua) > 0
  },
  android () {
    return this.ua.indexOf('Android') > -1 || this.ua.indexOf('Linux') > -1
  },
  nativeQQ () {
    return (this.ios() && this.ua.indexOf('UIWebView') > -1) || (this.android() && this.ua.indexOf('Mobile MQQBrowser') > -1)
  },
  weixin () {
    return this.ua.indexOf('MicroMessenger') > -1
  },
  /**
   * @param  {String}  value
   * @return {String}  value
   */
  serialize(value) {
    return JSON.stringify(value)
  },

  /**
   * @param {Object} el
   * @param {String} html
   */
  append (el, html) {

    var divTemp = document.createElement("div"),

      nodes = null,

      fragment = document.createDocumentFragment();

    divTemp.innerHTML = html;

    nodes = divTemp.childNodes;

    for (var i = 0, length = nodes.length; i < length; i += 1) {

      fragment.appendChild(nodes[i].cloneNode(true));
    }

    el.appendChild(fragment);

    // 清除
    nodes = null;
    fragment = null;
  },
  /**
   * @param  {String} value
   * @return {String} value
   */
  deserialize(value) {
    if (typeof value != 'string' || value == '') return ''
    try {
      return JSON.parse(value)
    } catch (e) {
      return ''
    }
  },
  isLocalStorageSupported() {
    var testKey = 'test'
    var storage = window.sessionStorage
    try {
      storage.setItem(testKey, 'testValue')
      storage.removeItem(testKey)
      return true;
    } catch (error) {
      return false
    }
  },
  /**
   * @param fn {Function}   实际要执行的函数
   * @param delay {Number}  执行间隔，单位是毫秒（ms）
   * @return {Function}     返回一个“节流”函数
   */
  throttle(fn, threshhold) {
    // 记录上次执行的时间
    var last

    // 定时器
    var timer

    // 默认间隔为 250ms
    threshhold || (threshhold = 250)

    // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
    return function () {

      // 保存函数调用时的上下文和参数，传递给 fn
      var context = this
      var args = arguments

      var now = +new Date()

      // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
      // 执行 fn，并重新计时
      if (last && now < last + threshhold) {
        clearTimeout(timer)

        // 保证在当前时间区间结束后，再执行一次 fn
        timer = setTimeout(() => {
          last = now
          fn.apply(context, args)
        }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  },
  /**
   * @param {Object} obj
   * @returns {string}
   *
   */
  queryStringify (obj) {

    function toQueryPair(key,value) {
      if (value==='') {
        return key;
      }
      return key + '=' + encodeURIComponent(value==='' ? '' : String(value))
    }

    let result = []
    for (var key in obj) {

      key = encodeURIComponent(key)
      const values = obj[key]
      if (values && values.constructor == Array) {

        const queryValues = []
        for (let i = 0, len = values.length; i < len; i++) {
          queryValues.push(toQueryPair(key, values[i]))
        }
        result = result.concat(queryValues)

      } else {
        result.push(toQueryPair(key,values))
      }
    }

    return result.join('&')
  },
  /**
   * @param {String || null } text
   * @return {Object}
   */
  query (strName){

    const queryObj = {}
    const query = location.search.substring(1) // Get query string

    const pairs = query.split("&") // Break at ampersand

    for (let i = 0; i < pairs.length; i++) {

      const pos = pairs[i].indexOf('=') // Look for "name=value"

      if (pos == -1) continue // If not found, skip

      const paramsName = pairs[i].substring(0, pos) // Extract the name

      let value = pairs[i].substring(pos + 1) // Extract the value

      value = decodeURIComponent(value) // Decode it, if needed

      queryObj[paramsName] = value // Store as a property
    }
    if (strName) {
      return queryObj[strName] // Return the object
    } else {
      return queryObj
    }
  },
  isPassive() {

    let supportsPassiveOption = false
    try {
      addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassiveOption = true
        }
      }));
    } catch(e) {}
    return supportsPassiveOption   //{passive: true} 就不会调用 preventDefault 来阻止默认滑动行为

  },

  setCookie (name, value, options) {
    var Days = (options && options.day) || 365
    var domain = (options && options.domain) || location.hostname
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/; domain=" + domain
  },
  getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg))
      return unescape(arr[2])
    else {
      return null
    }
  },
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/; domain=" + location.hostname
    }
  },
  getUaParams: function () {
    var matchers = this.ua.match(/\-\-\[([\s\S]+?)\]\-\-/i)
    if (matchers && matchers.length>1) {
      var uaObj = JSON.parse(matchers[1])
      return uaObj;
    }
    return {}
  },
  /**
   * @return {String} val
   */
  getRelatedUrl () {
    const val = location.pathname + (location.search || "")
    return val
  },
  login () {
    location.href = 'lyf://login'
  },
  logout () {
    location.href = 'lyf://logout'
  },
  /**
   * @return {String} ut
   */
  loggedIn () {
    let ut = utils.getUserToken()
    return ut && ut.length > 0
  },
  /**
   * set user token
   * @param {String} ut
   */
  setUserToken (ut) {
    utils.setCookie('lyfh5ut', ut)
    utils.setCookie('ut', '', {domain: 'laiyifen.com'})
  },
  //清空用户登录UT
  //因为在iphone6 se版本的微信里无法删除cookie，所以只能通过设置为空来标识用户退出登录状态。
  deleteUserToken () {
    utils.setCookie("lyfh5ut", "")
    utils.setCookie('ut', "", {domain: 'laiyifen.com'})
  },
  /**
   * get user token
   * @return {Sting} ut
   */
  getUserToken () {
    let ut = utils.getCookie('lyfh5ut') || ""
    return ut
  },
  /**
   * @return {String} sid
   */
  getSessionId () {
    var sid = utils.getCookie('sessionId')
    if (!sid) {
      var now = new Date()
      //随机数字
      var randNum = Math.round(Math.random() * 1000)
      sid = now.getTime() + "" + randNum
      utils.setCookie('sessionId', sid)
    }

    return sid
  },
  appViewFixed () {
    const appView = document.getElementById('app')
    if (appView.classList.contains('app_fixed')){
      appView.classList.remove('app_fixed')
    } else {
      appView.classList.add('app_fixed')
    }
  },
  trim (text) {
    return text.replace(/\s+/g, "")
  },
  loadScript (url,success) {
    const script = document.createElement("script")
    script.type = 'text/javascript'
    script.src = config.staticPath + url
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => {
      success && success()
    }
  },
  /**
   * @param {String} res
   */
  appendScript (res) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.appendChild(document.createTextNode(res))
    document.head.appendChild(script)
  },
  getVersion () {
    let version =  utils.getUaParams().version
    if (version) {
      version = version.replace(/\./g,'')
    }
    return version
  }
}

export default utils
