// 引入 luch-request 插件
import luchRequest from 'luch-request'
import config from '@/config'
import { getToken, setToken } from './auth'
import { throttle, currentPage } from './tools'
import { getWeixinCode, toLogin } from './login'
// 默认配置，和luch-request基本一致
const defaultConfig = {
  baseURL: '',
  header: {},
  method: 'POST',
  dataType: 'json',
  // #ifndef MP-ALIPAY
  responseType: 'text',
  // #endif
  // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
  custom: {}, // 全局自定义参数默认值
  // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
  timeout: 60000,
  // #endif
  // #ifdef APP-PLUS
  sslVerify: true,
  // #endif
  // #ifdef H5
  // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
  withCredentials: false,
  // #endif
  // #ifdef APP-PLUS
  firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
  // #endif
  // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
  // getTask: (task, options) => {
  // 相当于设置了请求超时时间500ms
  //   setTimeout(() => {
  //     task.abort()
  //   }, 500)
  // },
  // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
  validateStatus: (statusCode) => {
    // statusCode 必存在。此处示例为全局默认配置
    return statusCode >= 200 && statusCode < 300
  },
}

// 错误提示
const handleError = (title) => {
  uni.showToast({
    title,
    icon: 'none',
  })
}

/**
 * 创建http实例
 * @param {Object} config 用户自定义配置
 */
function request(config) {
  // 对luch-request 实例化，并且合并用户配置和默认配置
  const token = uni.getStorageSync('token')
  const header = {
    ...defaultConfig.header,
    // 'content-type': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    ...config.header,
    'X-AUTH-TOKEN': token, //自定义请求头信息
  }
  console.log(header)
  const request = new luchRequest({
    ...defaultConfig,
    ...config,
    header,
  })
  // 请求拦截，可以根据需求自定义配置
  request.interceptors.request.use(
    (config) => {
      uni.showLoading({})
      return config
    },
    (err: any) => {
      handleError(err.message)
      return Promise.reject(err)
    }
  )
  // 响应拦截，可以根据需求自定义配置
  request.interceptors.response.use(
    async (response) => {
      try {
        uni.hideLoading()
        return await intercept(response)
      } catch (err: any) {
        handleError(err.message)
        return Promise.reject(err)
      }
    },
    (err: any) => {
      handleError(err.message)
      return Promise.reject(err)
    }
  )
  return request
}

/**
 * 响应拦截器，抽成一个方法，比较灵活
 * @param {*} promise
 */
async function intercept(response) {
  const { data } = response || {}
  const { route } = currentPage()
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
    throw new Error(data.message)
  }
}

export const weixinLogin = throttle(_weixinLogin, 1000)
//小程序静默授权
async function _weixinLogin() {
  const code: any = await getWeixinCode()
  const res: any = await getSystemToken(code)
  console.log(res)

  const { onLoad, onShow } = currentPage()
  // 微信账号已经绑定用户
  if (res.isBundled) {
    setToken(res.token)
    onLoad && onLoad()
    onShow && onShow()
  } else {
    // 未绑定用户，跳转到登录页面
    uni.navigateTo({
      url: '/pages/login/index',
    })
  }
}

const http = request(config)
export const getSystemToken = (code: any) => {
  return new Promise((resolve, reject) => {
    http
      .get('wechat/miniapp/api/anon/userAccess', {
        params: {
          code,
        },
      })
      .then((res: any) => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export function fetchUserInfo(params) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    const getUser = (args) => {
      http
        .post('wechat/miniapp/api/anon/userGrant', args)
        .then((res: any) => {
          resolve(true)
          uni.setStorageSync('userInfo', res.data)

          uni.navigateTo({
            url: '/pages/home/index',
          })
        })
        .catch((err) => {
          reject(err)
          console.log(err)
        })
    }
    if (token) {
      getUser(params)
    } else {
      getSystemToken(params.code).then((res: any) => {
        setToken(res.token)
        if (!res.syncTime) {
          getWeixinCode().then((code) => {
            getUser({ ...params, code })
          })
        }
      })
    }
  })
}
export default http
