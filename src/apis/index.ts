import http from '@/utils/uniRequest'

export const getHomeData = (data) => {
  return http.get('/common/customizeQuery/HomePageData!/execute', data)
}
