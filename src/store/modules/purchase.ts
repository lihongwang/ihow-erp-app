import { defineStore } from 'pinia'
import { store } from '@/store'
import purchaseMock from '../mock/purchase.json'
import { getList } from '@/apis/purchase'
interface PurchaseState {
  list: any
}
export interface PurchaseListItem {
  title?: string
}
export const usePurchaseStore = defineStore({
  id: 'app-purchase',
  state: (): PurchaseState => ({
    // token
    list: purchaseMock,
  }),
  getters: {},
  actions: {
    resetState() {
      this.list = []
    },
    getById(id) {
      return this.list.find((p) => p.id == id)
    },
    init(data) {
      return new Promise((resolve) => {
        getList(data).then((res: any) => {
          this.list = res.list
          resolve(this.list)
        })
      })
    },
  },
})

// Need to be used outside the setup
export function usePurchaseStoreWithOut() {
  return usePurchaseStore(store)
}
