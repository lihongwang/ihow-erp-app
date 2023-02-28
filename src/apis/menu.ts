import http from '@/utils/uniRequest'
export const getMenus = () => {
  return http.get('/system/user/selectUserPermissionList')
}
