import { objectToArray } from '@/utils/data'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { getInList, getInDetail, audit, unAudit } from '@/apis/purchase'
interface PurchaseInState {
  list: any
  detail: any
}
export interface PurchaseInListItem {
  title?: string
}
export const itemInfo = {
  supplierName: {
    title: '供 应 商',
    aliasName: 'relatedPartyName',
  },
  createByTime: {
    title: '制单时间',
    type: 'date',
    params: {
      full: true,
    },
  },
  createByName: {
    title: '制 单 人',
  },
  billDate: {
    title: '入库日期',
    type: 'date',
  },
  totalQty: {
    title: '入库数量',
  },
  totalAmount: {
    title: '入库金额',
    type: 'money',
  },
  warehouseName: {
    title: '入库仓库',
  },
  deliveryCode: {
    title: '送货单号',
    _forDetail: true,
  },
  settlementDays: {
    title: '结算周期',
    _forDetail: true,
  },
  remark: {
    title: '备    注',
    _forDetail: true,
  },
}

export const detailItemInfo = {
  batchNumber: {
    title: '批次号',
  },
  goodsName: {
    title: '商品名称',
  },
  goodsCode: {
    title: '商品编号',
  },
  billDate: {
    title: '内部编号',
  },
  qty: {
    title: '入库数量',
    params: {
      editable: true,
    },
  },
  masterUnit: {
    title: '单位',
  },
  amount: {
    title: '入库金额',
    type: 'money',
  },
  price: {
    title: '单价',
    type: 'price',
  },
  warehouseAreaName: {
    title: '仓位',
  },
  wrinkles: {
    title: '纹路',
  },
  color: {
    title: '颜色',
  },
  purpose: {
    title: '用途',
  },
  packageModel: {
    title: '包装规格',
  },
  pecification: {
    title: '规格型号',
  },
  remark: {
    title: '备    注',
    _forDetail: true,
  },
}
export const itemInfoArray = objectToArray(itemInfo, 'name')
export const itemInfoArrayForList = objectToArray(itemInfo, 'name').filter((a) => !a._forDetail)
export const detailItemInfoArray = objectToArray(detailItemInfo, 'name')
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
  },
})

// Need to be used outside the setup
export function usePurchaseInStoreWithOut() {
  return usePurchaseInStore(store)
}
