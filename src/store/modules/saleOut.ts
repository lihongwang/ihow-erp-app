import { defineStore } from 'pinia'
import { store } from '@/store'
import { fixNumber } from '@/utils/data'
import http from '@/utils/uniRequest'
import pageInfo from '@/pageInfo/saleOut.json'
interface SaleOutState {
  list: any
  formData: any
}
export interface SaleOutListItem {
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

const _detailKey = pageInfo.detail.detailKey
export const useSaleOutStore = defineStore({
  id: 'app-sale-out',
  state: (): SaleOutState => ({
    // token
    list: [],
    formData: {
      billDate: new Date(),
      [_detailKey]: [],
    },
  }),
  getters: {
    detailKey: () => _detailKey,
  },
  actions: {
    resetState() {
      this.list = []
      this.formData = {
        billDate: new Date(),
        [_detailKey]: [],
      }
    },
    resetFormData() {
      this.formData = {
        billDate: new Date(),
        [_detailKey]: [],
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
          this.formData = {
            ...res,
            [this.detailKey]: res[this.detailKey].map((d) => ({
              ...d,
              _original: true,
            })),
          }
          resolve(this.formData)
        })
      })
    },
    // 添加明细 弹框列表
    getPopupDetails(data) {
      console.log('saleOut popupDetails')
      return new Promise((resolve) => {
        service.selectDetails(data).then((res: any) => {
          resolve(res)
        })
      })
    },
    getPopupMapping() {
      return {
        transfer: (data) => {
          return { ...data, [pageInfo.detail.detailPrimaryKey]: data.id }
        },
        subName: pageInfo.popup.subName,
        popupFields: pageInfo.popup.fields,
      }
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
        const { customerId, customerName, customerCode, ...rest } = this.formData
        service
          .add({
            ...rest,
            relatedPartyId: customerId,
            relatedPartyName: customerName,
            relatedPartyCode: customerCode,
            ...this._getTotalInfo(),
          })
          .then((res: any) => {
            resolve(res)
            this.resetFormData()
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
            this.resetFormData()
          })
      })
    },
    // 修改
    update() {
      return new Promise((resolve) => {
        service
          .update({
            ...this.formData,
            [_detailKey]: this.formData[_detailKey].map((detail) => {
              return { ...detail, stockOutEnum: detail.stockOutEnum?.value }
            }),
            ...this._getTotalInfo(),
          })
          .then((res: any) => {
            resolve(res)
          })
      })
    },

    _getTotalInfo() {
      const list = this.formData[_detailKey]
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
        [_detailKey]: [...data],
      }
      return this.formData
    },

    getFormDetailData() {
      return this.formData[_detailKey]
    },
  },
})

// Need to be used outside the setup
export function useSaleOutStoreWithOut() {
  return useSaleOutStore(store)
}
