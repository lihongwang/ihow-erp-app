import { defineStore } from 'pinia'
import { store } from '@/store'
import { getList, getDetail, audit, unAudit, getSelectDetails } from '@/apis/purchase/purchaseIn'
interface PurchaseInState {
  list: any
  detail: any
  editData: any
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
    editData: {},
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
        getDetail({ id }).then((res: any) => {
          this.detail = res
          resolve(this.detail)
        })
      })
    },
    init(data) {
      return new Promise((resolve) => {
        getList(data).then((res: any) => {
          this.list = [...(res?.list || [])]
          resolve(res)
        })
      })
    },
    getDetails(data) {
      return new Promise((resolve) => {
        getSelectDetails(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    loadMore(data) {
      return new Promise((resolve) => {
        getList(data).then((res: any) => {
          this.list = [...this.list, ...(res?.list || [])]
          resolve(res)
        })
      })
    },
    audit(data) {
      return new Promise((resolve) => {
        audit(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    unAudit(data) {
      return new Promise((resolve) => {
        unAudit(data).then((res: any) => {
          resolve(res)
        })
      })
    },

    setEditData(data) {
      this.editData = data
    },

    getEditData() {
      return this.editData
    },
  },
})

// Need to be used outside the setup
export function usePurchaseInStoreWithOut() {
  return usePurchaseInStore(store)
}
