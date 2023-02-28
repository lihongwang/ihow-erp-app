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
export const throttle = (func, wait = 1000, context?: any) => {
  let timer: any = null
  console.log('run 6666')
  return function (...args) {
    if (timer) return
    timer = setTimeout(function () {
      console.log('run 9999')
      func.apply(context, args)
      timer = null
    }, wait)
  }
}
//节流
// export const throttle = (func, time = 1000, context?: any) => {
//   let previous = 0
//   console.log('run 3333')
//   return function (...args) {
//     let now = Date.now()
//     console.log('run 6666')
//     console.log(now - previous > time)
//     if (now - previous > time) {
//       console.log('run')
//       func.apply(context, args)
//       previous = now
//     }
//   }
// }

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
