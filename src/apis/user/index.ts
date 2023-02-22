import type { ReqAuth, ReqParams, ResResult } from './model'
import http from '@/utils/request'

const URL = {
  login: '/v1/user/login',
  permission: '/v1/user/permission',
}

const login = async (data: ReqParams) => http.post<ResResult>(URL.login, { params: data })

const permission = async () => http.get<ReqAuth>(URL.permission)

export default { login, permission }
