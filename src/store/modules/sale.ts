import { defineStore } from 'pinia'
import { store } from '@/store'
import { getList, getDetail } from '@/apis/sale'
interface SaleState {
  list: any
  detail: any
}
export interface SaleListItem {
  title?: string
}
export const useSaleStore = defineStore({
  id: 'app-sale',
  state: (): SaleState => ({
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
        getDetail({ id }).then((res: any) => {
          this.detail = res.data
          resolve(this.detail)
        })
      })
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
export function useSaleStoreWithOut() {
  return useSaleStore(store)
}
