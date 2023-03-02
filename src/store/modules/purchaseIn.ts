import { defineStore } from 'pinia'
import { store } from '@/store'
import { getInList, getInDetail } from '@/apis/purchase'
interface PurchaseInState {
  list: any
  detail: any
}
export interface PurchaseInListItem {
  title?: string
}
export const usePurchaseInStore = defineStore({
  id: 'app-purchase-in',
  state: (): PurchaseInState => ({
    // token
    list: [],
    detail: null,
  }),
  getters: {},
  actions: {
    resetState() {
      this.list = []
    },
    resetDetail() {
      this.detail = null
    },
    getById(id) {
      return new Promise((resolve) => {
        getInDetail({ id }).then((res: any) => {
          this.detail = res
          resolve(this.detail)
        })
      })
    },
    init(data) {
      return new Promise((resolve) => {
        getInList(data).then((res: any) => {
          this.list = [...(res?.list || [])]
          resolve(res)
        })
      })
    },
    loadMore(data) {
      return new Promise((resolve) => {
        getInList(data).then((res: any) => {
          this.list = [...this.list, ...(res?.list || [])]
          resolve(res)
        })
      })
    },
  },
})

// Need to be used outside the setup
export function usePurchaseInStoreWithOut() {
  return usePurchaseInStore(store)
}
