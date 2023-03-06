import http from '@/utils/uniRequest'

export const getList = (data) => {
  return http.get('common/customizeQuery/SelectAvailableSupplier!/execute', data)
}
