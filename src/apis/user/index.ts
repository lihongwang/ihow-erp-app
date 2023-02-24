import type { ReqAuth, ReqParams, ResResult } from './model'
import http from '@/utils/request'

const URL = {
  login: '/v1/user/login',
  permission: '/v1/user/permission',
  access: '/wechat/miniapp/api/anon/userGrant',
}

const login = async (data: ReqParams) => http.post<ResResult>(URL.login, { params: data })

const permission = async () => http.get<ReqAuth>(URL.permission)

const access = async (data: any) => http.post<any>(URL.access, { params: data })
export default { login, permission, access }
