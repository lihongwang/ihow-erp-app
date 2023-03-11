import { defineStore } from 'pinia'
import { store } from '@/store'
import { getList, getCustomerList, getSupplierList } from '@/apis/relatedParty'
interface RelatedPartyState {
  list: any
  detail: any
}
export interface RelatedPartyListItem {
  title?: string
}
export const useRelatedPartyStore = defineStore({
  id: 'app-related-party',
  state: (): RelatedPartyState => ({
    // token
    list: [],
    detail: {},
  }),
  getters: {
    detailKey: () => _detailKey,
  },
  actions: {
    resetState() {
      this.list = []
    },
    init(data) {
      return new Promise((resolve) => {
        getList(data).then((res: any) => {
          this.list = res.list
          resolve(res)
        })
      })
    },
    initCustomer(data) {
      return new Promise((resolve) => {
        getCustomerList(data).then((res: any) => {
          this.list = res.list
          resolve(res)
        })
      })
    },
    initSupplier(data) {
      return new Promise((resolve) => {
        getSupplierList(data).then((res: any) => {
          this.list = res.list
          resolve(res)
        })
      })
    },
  },
})

// Need to be used outside the setup
export function useRelatedPartyStoreWithOut() {
  return useRelatedPartyStore(store)
}
