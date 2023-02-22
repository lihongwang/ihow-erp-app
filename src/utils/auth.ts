const TokenKey = 'x-auth-token'

export function getToken() {
  return uni.getStorageSync(TokenKey) || ''
}

export function setToken(token: string) {
  uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  uni.removeStorageSync(TokenKey)
}
