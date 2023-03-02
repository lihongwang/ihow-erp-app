import { defineStore } from 'pinia'
import { store } from '@/store'
import { getExtraInList, getExtraInDetail } from '@/apis/purchase'
interface PurchaseExtraInState {
  list: any
  detail: any
}
export interface PurchaseExtraInListItem {
  title?: string
}
export const usePurchaseExtraInStore = defineStore({
  id: 'app-purchase-extra-in',
  state: (): PurchaseExtraInState => ({
    // token
    list: [],
    detail: {},
  }),
  getters: {},
  actions: {
    resetState() {
      this.list = []
    },
    getById(id) {
      return new Promise((resolve) => {
        getExtraInDetail({ id }).then((res: any) => {
          this.detail = res.data
          resolve(this.detail)
        })
      })
    },
    init(data) {
      return new Promise((resolve) => {
        getExtraInList(data).then((res: any) => {
          this.list = res.list
          resolve(this.list)
        })
      })
    },
  },
})

// Need to be used outside the setup
export function usePurchaseExtraInStoreWithOut() {
  return usePurchaseExtraInStore(store)
}
