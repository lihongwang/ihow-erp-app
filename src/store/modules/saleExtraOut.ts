import { defineStore } from 'pinia'
import { store } from '@/store'
import { getExtraOutList, getExtraOutDetail } from '@/apis/sale'
interface SaleExtraOutState {
  list: any
  detail: any
}
export interface SaleExtraOutListItem {
  title?: string
}
export const useSaleExtraOutStore = defineStore({
  id: 'app-sale',
  state: (): SaleExtraOutState => ({
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
        getExtraOutDetail({ id }).then((res: any) => {
          this.detail = res.data
          resolve(this.detail)
        })
      })
    },
    init(data) {
      return new Promise((resolve) => {
        getExtraOutList(data).then((res: any) => {
          this.list = res.list
          resolve(this.list)
        })
      })
    },
  },
})

// Need to be used outside the setup
export function useSaleExtraOutStoreWithOut() {
  return useSaleExtraOutStore(store)
}
