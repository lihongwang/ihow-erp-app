import http from '@/utils/uniRequest'
export const getList = (data) => {
  return http.get('common/customizeQuery/SaleOrder/execute', data)
}
export const getDetail = (data) => {
  return http.get('common/customizeQuery/SaleOrder.select/execute', data)
}
export const getOutList = (data) => {
  return http.get('common/customizeQuery/SaleOut/execute', data)
}
export const getOutDetail = (data) => {
  return http.get('common/customizeQuery/SaleOut.select/execute', data)
}
export const getExtraOutList = (data) => {
  return http.get('common/customizeQuery/ExtraSaleOut/execute', data)
}
export const getExtraOutDetail = (data) => {
  return http.get('common/customizeQuery/ExtraSaleOut.select/execute', data)
}
