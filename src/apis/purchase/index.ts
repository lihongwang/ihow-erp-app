import http from '@/utils/uniRequest'
export const getList = (data) => {
  return http.get('common/customizeQuery/PurchaseOrder/execute', data)
}

export const getDetail = (data) => {
  return http.get('common/customizeQuery/PurchaseOrder.select/execute', data)
}
export const getInList = (data) => {
  return http.get('common/customizeQuery/PurchaseIn/execute', data)
}
export const getInDetail = (data) => {
  return http.get('common/customizeQuery/PurchaseIn.select/execute', data)
}
export const getExtraInList = (data) => {
  return http.get('common/customizeQuery/ExtraPurchaseIn/execute', data)
}
export const getExtraInDetail = (data) => {
  return http.get('common/customizeQuery/ExtraPurchaseIn.select/execute', data)
}

export const audit = (data) => {
  return http.post('wms/goodsIn/audit', data)
}
export const unAudit = (data) => {
  return http.post('wms/goodsIn/unaudit', data)
}
