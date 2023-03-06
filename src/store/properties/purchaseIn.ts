import { objectToArray } from '@/utils/data'
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
  aliasCode: {
    title: '内部编号',
  },
  purchaseQty: {
    title: '采购数量',
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
const selectItem = {
  goodsName: {
    title: '商品名称',
  },
  goodsCode: {
    title: '商品编号',
  },
  aliasCode: {
    title: '内部编号',
  },
  qty: {
    title: '采购数量',
  },
  stockInQty: {
    title: '已入库数量',
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
}
export const itemInfoArray = objectToArray(itemInfo, 'name')
export const itemInfoArrayForList = objectToArray(itemInfo, 'name').filter((a) => !a._forDetail)
export const detailItemInfoArray = objectToArray(detailItemInfo, 'name')
export const selectItemArray = objectToArray(selectItem, 'name')
export const selectItemArrayForList = objectToArray(selectItem, 'name')
