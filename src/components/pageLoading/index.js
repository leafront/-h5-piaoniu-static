import utils from '@/widget/utils'

const pageLoading = {
  installed: false,
  install (Vue, options) {
    if (pageLoading.installed) {
      return
    }
    let opt = {
      // 默认持续时间
      duration: "3000"
    }
    // 使用options的配置
    for (let i in options) {
      opt[i] = options[i]
    }
    Vue.prototype.$showPageLoading = () => {

      // 如果页面有toast则不继续执行
      if (document.querySelector('.ui-pageLoading-mask')) {
        return
      } 
      // 1、创建构造器，定义好提示信息的模板
      const tpl = `
      <div class="ui-pageLoading-mask">
       <div class="ui-mask-cont">
         <svg class="pageLoading-icon" aria-hidden="true">
            <use xlink:href="#icon-loading"></use>
          </svg>
          <p>努力加载中...</p>
       </div>   
       </div>
      `
      utils.append(document.body, tpl)

      //阻止遮罩滑动
      tpl.addEventListener("touchmove", function(e) {
        e.stopPropagation()
        e.preventDefault()
      })

      pageLoading.installed = true
    }
    Vue.prototype.$hidePageLoading = () => {
      const maskUi = document.querySelector('.ui-pageLoading-mask')
      if (maskUi) {
        maskUi.parentNode.removeChild(maskUi)
      }
    }
  }
}

export default pageLoading
