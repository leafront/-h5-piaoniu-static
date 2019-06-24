import request from '@/widget/request'
import config from '@/config/index'
import utils from '@/widget/utils'
import store from '@/widget/store'
import pageInfo from '@/config/tracker'

/**
 * @return {String} uuid
 */
const generateUUID = () => {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16)
  })
  return uuid
}
/**
 * @param  {String} url
 * @return {String} _obj
 */
const getParseUrl = (url) => {
  if (!url) {
    return
  }
  const REG_PARSE_URL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  let _obj = {}
  let _name = ['url','scheme','slash','host','port','path','query','hash']
  let _url = REG_PARSE_URL.exec(url)
  for (let i = 0; i< _name.length; i++) {
    _obj[_name[i]] = _url[i]
  }
  return _obj
}
/**
 * 页面埋点
 * @param  {String} pid 页面埋点
 * @param  {String} ppid 前序页面id
 * @return {Null}
 */
export const sendTracker = ({
  pid = '',
  ignoreLog = false,
  cid = '',
  sk = '',
  referrer = ''
 } = {}) => {
  if (ignoreLog) {
    return
  }
  const getTracker = (data) => request('/tracker/post', data)
  referrer = referrer || document.referrer
  const uid = store.get('lyfuid', 'local') || ''
  let did = utils.getCookie('pika_did')
  if (!did) {
    did = generateUUID()
    utils.setCookie('pika_did', did)
  }
  const params = {
    ev: '17',
    did: did,
    tv: '1.0',
    v: '', //version 客户端版本号
    ut: utils.getUserToken(),
    uid: uid,
    pid, // 页面ID
    inf: '', // inFrom 内部来源 上一个页面的page id
    cha: 'H5', // channel 所属渠道编码：IOS／ANDROID／H5/APPLET（小程序）／WEBSITE（官网）
    ct:  + new Date, // curTime 当前时间戳毫秒
    bt: 'pv', //businessType 业务类型：init/pv/event
    data: {
      ru: referrer,
      cpu: location.href
    } 
  }
  if (referrer) {
    const referrerPath = getParseUrl(referrer)
    if (pageInfo[referrerPath.path]) {
      params.inf = pageInfo[referrerPath.path].p_name
      params.data.ppid = pageInfo[referrerPath.path].p_id
    }
  }
  if (cid) {
    params.data.cid = cid
  }
  if (sk) {
    params.data.sk = sk
  }
  params.data = JSON.stringify(params.data)
  getTracker({
    type: 'POST',
    data: params,
    hostPath: config.trackerPath
  })
}