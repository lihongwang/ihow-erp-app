import http from '@/utils/uniRequest'

const apiUrls = {
  appLogin: '/common/company/login',
  appLogout: '/system/user/logout',
  grant: '/wechat/miniapp/api/anon/userGrant',
  bundle: '/wechat/miniapp/api/anon/userBundle',
  unBundle: '/wechat/miniapp/api/userUnbundle',
}

const appLogin = async (data) => {
  return http.post(apiUrls.appLogin, data, {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}

const appLogout = async () => {
  return http.get(apiUrls.appLogout)
}

const grant = async (data) => {
  return http.post(apiUrls.grant, data, {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}
const bundle = async (data) => {
  return http.post(apiUrls.bundle, data, {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}
const unBundle = async () => {
  return http.post(apiUrls.unBundle)
}
export { grant, bundle, appLogin, appLogout, unBundle }
