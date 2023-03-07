import { defineStore } from 'pinia'
import { store } from '@/store'
import { add, update, del, getList, getDetail, audit, unAudit, getSelectDetails } from '@/apis/purchase/purchaseIn'
import { fixNumber } from '@/utils/data'
interface PurchaseInState {
  list: any
  formData: any
}
export interface PurchaseInListItem {
  title?: string
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
    // 列表
    init(data) {
      return new Promise((resolve) => {
        getList(data).then((res: any) => {
          this.list = [...(res?.list || [])]
          resolve(res)
        })
      })
    },
    // 查看
    show(id) {
      return new Promise((resolve) => {
        getDetail({ id }).then((res: any) => {
          this.formData = res
          resolve(res)
        })
      })
    },
    // 添加明细 弹框列表
    getDetails(data) {
      return new Promise((resolve) => {
        getSelectDetails(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    // 列表分页
    loadMore(data) {
      return new Promise((resolve) => {
        getList(data).then((res: any) => {
          this.list = [...this.list, ...(res?.list || [])]
          resolve(res)
        })
      })
    },
    // 审核
    audit(data) {
      return new Promise((resolve) => {
        audit(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    // 反审核
    unAudit(data) {
      return new Promise((resolve) => {
        unAudit(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    // 新增
    add() {
      return new Promise((resolve) => {
        add({
          ...this.formData,
          ...this._getTotalInfo(),
        }).then((res: any) => {
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
        del({
          id: this.formData.id,
        }).then((res: any) => {
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
        update({
          ...this.formData,
          ...this._getTotalInfo(),
        }).then((res: any) => {
          resolve(res)
          this.formData = {
            billDate: new Date(),
            goodsInDetailList: [],
          }
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
