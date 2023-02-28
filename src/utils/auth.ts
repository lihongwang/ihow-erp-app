const TokenKey = 'x-auth-token'
const UserInfoKey = 'user-info'

export function getToken() {
  return uni.getStorageSync(TokenKey) || ''
}

export function setToken(token: string) {
  uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  uni.removeStorageSync(TokenKey)
}

export function getUserInfo() {
  return uni.getStorageSync(UserInfoKey) || {}
}

export function setUserInfo(data: any) {
  uni.setStorageSync(UserInfoKey, data)
}

export function removeUserInfo() {
  uni.removeStorageSync(UserInfoKey)
}
