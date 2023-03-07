import http from '@/utils/uniRequest'

export const getList = (data) => {
  return http.get('common/customizeQuery/PurchaseIn/execute', data)
}
export const getDetail = (data) => {
  return http.get('common/customizeQuery/PurchaseIn.select/execute', data)
}
export const getSelectDetails = (data) => {
  return http.get('common/customizeQuery/PurchaseInSelectPurchaseOrderDetail!/execute', data)
}
export const audit = (data) => {
  return http.post('wms/goodsIn/audit', data)
}
export const unAudit = (data) => {
  return http.post('wms/goodsIn/unaudit', data)
}
export const add = (data) => {
  return http.post('wms/goodsIn/add', data)
}
export const update = (data) => {
  return http.post('wms/goodsIn/update', data)
}
export const del = (data) => {
  return http.post('wms/goodsIn/delete', data)
}
