
import utils from '@/widget/utils'

const pageLoading = {
  installed: false,
  install (Vue) {
    if (pageLoading.installed) {
      return
    }
    Vue.prototype.$showLoading = () => {

      // 如果页面有showLoading则不继续执行
      if (document.getElementById('showLoading')) {
        return
      } 
      // 1、创建构造器，定义好提示信息的模板
      const tpl = `
        <div class="ui-showLoading" id="showLoading">
            <div class="ui-showLoading-gif"></div>
        </div>
      `
      utils.append(document.body, tpl)
      //阻止遮罩滑动
      tpl.addEventListener('touchmove', function(e) {
        if (!utils.isPassive()) {
          e.preventDefault()
        }
        e.stopPropagation()
      },utils.isPassive() ? {passive: true} : false)
      pageLoading.installed = true
    }

    Vue.prototype.$hideLoading = () => {
      const maskUi = document.getElementById('showLoading')
      if (maskUi) {
        maskUi.parentNode.removeChild(maskUi)
      }
    }
  }
}

export default pageLoading
