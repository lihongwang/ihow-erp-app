import { defineStore } from 'pinia'
import { store } from '@/store'
import { getOutList, getOutDetail } from '@/apis/sale'
interface SaleOutState {
  list: any
  detail: any
}
export interface SaleOutListItem {
  title?: string
}
export const useSaleOutStore = defineStore({
  id: 'app-sale',
  state: (): SaleOutState => ({
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
        getOutDetail({ id }).then((res: any) => {
          this.detail = res.data
          resolve(this.detail)
        })
      })
    },
    init(data) {
      return new Promise((resolve) => {
        getOutList(data).then((res: any) => {
          this.list = res.list
          resolve(this.list)
        })
      })
    },
  },
})

// Need to be used outside the setup
export function useSaleOutStoreWithOut() {
  return useSaleOutStore(store)
}
