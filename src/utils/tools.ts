/* eslint-disable no-undef */
//当前页面

export function currentPage() {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage || {}
}

// H5复制方法
export function copy(str) {
  // #ifdef H5
  let aux = document.createElement('input')
  aux.setAttribute('value', str)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  uni.showToast({
    title: '复制成功',
  })
  // #endif

  // #ifndef H5
  uni.setClipboardData({
    data: str.toString(),
  })
  // #endif
}

//节流
export const throttle = (func, time = 1000, context?: any) => {
  let previous = new Date(0).getTime()
  return function (...args) {
    let now = new Date().getTime()
    if (now - previous > time) {
      func.apply(context, args)
      previous = now
    }
  }
}

//判断是否为微信环境
export function isWeixinClient() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i)) {
    //这是微信环境
    return true
  } else {
    //这是非微信环境
    return false
  }
}
