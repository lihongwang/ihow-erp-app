import { defineStore } from 'pinia'
import { store } from '@/store'
import purchaseMock from '../mock/purchase.json'
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
  },
})

// Need to be used outside the setup
export function usePurchaseStoreWithOut() {
  return usePurchaseStore(store)
}
