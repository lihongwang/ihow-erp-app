import config from '@/config'
import { getToken, setToken } from './auth'
import { throttle, currentPage } from './tools'
import { getWeixinCode, toLogin } from './login'

// 定义请求地址
const BASE_URL = config.baseURL
// 封装请求方法
const request = (obj) => {
  obj.url = obj.url || '' // 请求路径
  obj.method = obj.method || 'GET' //请求方式
  obj.data = obj.data || {} //请求携带的数据
  obj.header = obj.header || {} //请求头信息 content-type
  obj.loading = obj.loading === false ? false : true //是否显示请求加载中
  obj.requestTime = obj.requestTime || 500 //多久时间内完成网络请求，则不显示提示框

  let loadingStatus = true
  //定义网络请求如果在一定时间内没有完成，则显示加载中提示框，默认时间为：500毫秒
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  //返回Promise对象
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + obj.url,
      method: obj.method,
      data: obj.data,
      header: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': getToken(),
        ...obj.header,
      },
      success: (res) => {
        resolve(intercept(res))
      },
      fail: (err: any) => {
        console.log('fail')
        if (loadingStatus && obj.loading) {
          uni.hideLoading()
        }
        loadingStatus = false
        reject(err)
      },
      complete: () => {
        loadingStatus = false
        console.log('complete')
      },
    })
  })
}
// 错误提示
const handleError = (title) => {
  setTimeout(() => {
    uni.showToast({
      title,
      icon: 'none',
    })
  }, 1000)
}
/**
 * 响应拦截器，抽成一个方法，比较灵活
 * @param {*} promise
 */
function intercept(response) {
  const { data } = response || {}
  const { route } = currentPage()
  uni.hideLoading()
  if (data?.status === 5003) {
    // token失效重新获取微信code从后台获取token
    //#ifdef MP-WEIXIN
    weixinLogin()
    // #endif
    //#ifdef H5 || APP-PLUS
    if (route) {
      toLogin()
    }
    // #endif
  } else if (data?.status === 2000) {
    return data?.data
  } else {
    handleError(data.message)
    throw new Error(data.message)
  }
}

export const weixinLogin = throttle(_weixinLogin, 1000)
//小程序静默授权
async function _weixinLogin() {
  console.log('_weixinLogin:in')
  const code: any = await getWeixinCode()
  console.log('_weixinLogin:', code)
  const res: any = await getSystemToken(code)
  console.log(res)
  const { onLoad, onShow } = currentPage()
  // 微信账号已经绑定用户
  if (res.bundled) {
    setToken(res.token)
    onLoad?.()
    onShow?.()
    console.log('logined')
  } else {
    // 未绑定用户，跳转到登录页面
    console.log('weixinLogin: weixin login')
    uni.navigateTo({
      url: '/pages/login/index',
    })
  }
}

const http = {
  get: (url, data?: any, options?: any) =>
    request({
      url,
      method: 'GET',
      data,
      ...(options || {}),
    }),
  post: (url, data?: any, options?: any) =>
    request({
      url,
      method: 'POST',
      data,
      ...(options || {}),
    }),
}
export const getSystemToken = (code: any) => {
  console.log('getSystemToken:')
  return new Promise((resolve, reject) => {
    // uni.request({
    //   url: `${config.baseURL}wechat/miniapp/api/anon/userAccess?code=${code}`, //仅为示例，并非真实接口地址。
    //   success: (res) => {
    //     const { data }: any = res.data
    //     resolve(data)
    //   },
    // })
    try {
      console.log('getSystemToken: promise')
      http
        .get('wechat/miniapp/api/anon/userAccess', {
          code,
        })
        .then((res: any) => {
          console.log('getSystemToken success:')
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    } catch (error) {
      console.log(error)
    }
  })
}

export function fetchUserInfo(params) {
  return new Promise((resolve, reject) => {
    const getUser = (args) => {
      http
        .post('wechat/miniapp/api/anon/userGrant', args, {
          header: { 'content-type': 'application/x-www-form-urlencoded' },
        })
        .then((res: any) => {
          if (res.bundled) {
            resolve(true)
            uni.switchTab({
              url: '/pages/home/index',
            })
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(err)
          console.log(err)
        })
    }
    getSystemToken(params.code).then((res: any) => {
      setToken(res.token)
      getWeixinCode().then((code) => {
        getUser({ ...params, code })
      })
    })
  })
}
export default http
