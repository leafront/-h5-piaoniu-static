import utils from '@/widget/utils'

const Toast = {
  installed: false,
  install (Vue, options) {
    if(Toast.installed) return
    let opt = {
      // 默认持续时间
      duration: "2000"
    }
    // 使用options的配置
    for(let i in options) {
      opt[i] = options[i]
    }
    Vue.prototype.$toast = (toast) => {

      // 如果页面有toast则不继续执行
      if (document.querySelector('.ui-toast-mask')) {
        return
      }
      // 1、创建构造器，定义好提示信息的模板
      let tpl = `
       <div class="ui-toast-mask">
         <div class="ui-toast">
          <span>${toast}</span>
         </div>
       </div>  
      `
      utils.append(document.body, tpl)
      const toastPopup = document.querySelector('.ui-toast-mask')
      // 4.三秒后移除
      setTimeout(() => {
        toastPopup.parentNode.removeChild(toastPopup)
      }, opt.duration)

      Toast.installed = true

    }
  }
}

export default Toast
