import http from '@/utils/uniRequest'

export const getList = (data) => {
  return http.get('common/customizeQuery/SelectAvailableSupplier!/execute', data)
}

export const getCustomerList = (data) => {
  return http.get('common/customizeQuery/SelectAvailableCustomer!/execute', data)
}

export const getSupplierList = (data) => {
  return http.get('common/customizeQuery/SelectAvailableSupplier!/execute', data)
}
