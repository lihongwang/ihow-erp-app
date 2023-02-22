//获取code
export function getUrlParms(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)

  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}
//判断当前浏览器是否是微信内置浏览器
export function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i)) {
    return true // 微信中打开
  } else {
    return false // 普通浏览器中打开
  }
}

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
