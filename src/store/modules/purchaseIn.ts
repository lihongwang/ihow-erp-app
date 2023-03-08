import { defineStore } from 'pinia'
import { store } from '@/store'
import { fixNumber } from '@/utils/data'
import http from '@/utils/uniRequest'
import pageInfo from '@/pageInfo/purchaseIn.json'
interface PurchaseInState {
  list: any
  formData: any
}
export interface PurchaseInListItem {
  title?: string
}
const {
  get: { list, show, detailPopup },
  post: { add, update, del, audit, unAudit },
} = pageInfo.api
const service = {
  add: (data) => {
    return http.post(add, data)
  },
  update: (data) => {
    return http.post(update, data)
  },
  del: (data) => {
    return http.post(del, data)
  },
  list: (data) => {
    return http.get(list, data)
  },
  show: (data) => {
    return http.get(show, data)
  },
  audit: (data) => {
    return http.post(audit, data)
  },
  unAudit: (data) => {
    return http.post(unAudit, data)
  },
  selectDetails: (data) => {
    return http.get(detailPopup, data)
  },
}
export const usePurchaseInStore = defineStore({
  id: 'app-purchase-in',
  state: (): PurchaseInState => ({
    // token
    list: [],
    formData: {
      billDate: new Date(),
      goodsInDetailList: [],
    },
  }),
  getters: {},
  actions: {
    resetState() {
      this.list = []
      this.formData = {
        billDate: new Date(),
        goodsInDetailList: [],
      }
    },
    resetFormData() {
      this.formData = {
        billDate: new Date(),
        goodsInDetailList: [],
      }
    },
    // 列表
    init(data) {
      return new Promise((resolve) => {
        service.list(data).then((res: any) => {
          this.list = [...(res?.list || [])]
          resolve(res)
        })
      })
    },
    // 查看
    show(id) {
      return new Promise((resolve) => {
        service.show({ id }).then((res: any) => {
          this.formData = res
          resolve(res)
        })
      })
    },
    // 添加明细 弹框列表
    getDetails(data) {
      return new Promise((resolve) => {
        service.selectDetails(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    // 列表分页
    loadMore(data) {
      return new Promise((resolve) => {
        service.list(data).then((res: any) => {
          this.list = [...this.list, ...(res?.list || [])]
          resolve(res)
        })
      })
    },
    // 审核
    audit(data) {
      return new Promise((resolve) => {
        service.audit(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    // 反审核
    unAudit(data) {
      return new Promise((resolve) => {
        service.unAudit(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    // 新增
    add() {
      return new Promise((resolve) => {
        service
          .add({
            ...this.formData,
            ...this._getTotalInfo(),
          })
          .then((res: any) => {
            resolve(res)
            this.formData = {
              billDate: new Date(),
              goodsInDetailList: [],
            }
          })
      })
    },
    del() {
      return new Promise((resolve) => {
        service
          .del({
            id: this.formData.id,
          })
          .then((res: any) => {
            resolve(res)
            this.formData = {
              billDate: new Date(),
              goodsInDetailList: [],
            }
          })
      })
    },
    // 修改
    update() {
      return new Promise((resolve) => {
        service
          .update({
            ...this.formData,
            ...this._getTotalInfo(),
          })
          .then((res: any) => {
            resolve(res)
          })
      })
    },

    _getTotalInfo() {
      const list = this.formData.goodsInDetailList
      let totalAmount = 0
      let totalQty = 0
      list.forEach((item) => {
        totalAmount += Number(item.amount)
        totalQty += Number(item.qty)
      })
      return {
        totalAmount: fixNumber(totalAmount, 2),
        totalQty: fixNumber(totalQty, 2),
      }
    },

    setFormData(data) {
      this.formData = {
        ...this.formData,
        ...data,
      }
      return this.formData
    },

    getFormData() {
      return this.formData
    },

    updateDetailData(data) {
      this.formData = {
        ...this.formData,
        goodsInDetailList: [...data],
      }
      return this.formData
    },

    getFormDetailData() {
      return this.formData.goodsInDetailList
    },
  },
})

// Need to be used outside the setup
export function usePurchaseInStoreWithOut() {
  return usePurchaseInStore(store)
}
