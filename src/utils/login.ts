import { throttle, currentPage } from './tools'
// 获取登录凭证（code）
export function getWeixinCode() {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'oauth',
      success: function (res) {
        console.log(res)
        //微信端
        if (~(res.provider as any).indexOf('weixin')) {
          //微信登录
          uni.login({
            success(res) {
              resolve(res.code)
            },
            fail(res) {
              reject(res)
            },
          })
        }
      },
    })
  })
}
//小程序获取用户信息
export function getUserProfile() {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      desc: '获取用户信息，完善用户资料 ',
      success: (res) => {
        resolve(res)
      },
      fail(res) {
        reject(res)
      },
    })
  })
}

export const toLogin = throttle(_toLogin, 1000)
// 去登录
function _toLogin() {
  //#ifdef APP-PLUS || MP-WEIXIN
  uni.navigateTo({
    url: '/pages/login/index',
  })
  //#endif
  //#ifdef  H5
  const pathLogin = 'pages/login/index'
  let path = currentPage().route
  if (path != pathLogin) {
    uni.navigateTo({
      url: '/pages/login/index',
    })
  }
  // #endif
}
