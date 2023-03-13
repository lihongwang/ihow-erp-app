```json
{
  "title": "采购订单", // 页面navbar显示的标题
  "url": { // 页面导航
    "add": "/pages/purchase/purchaseOrder/add",
    "edit": "/pages/purchase/purchaseOrder/edit?id=",
    "home": "/pages/home/index",
    "index": "/pages/purchase/purchaseOrder/index",
    "show": "/pages/purchase/purchaseOrder/show?id="
  },
  "search": {
    "searchKey": "code1", // 列表页 搜索的code key
    "popSeach": { // 弹出框搜索 字段
      "fields": []
    }
  },
  "api": { // 后台api
    "get": {
      "list": "common/customizeQuery/PurchaseOrder/execute",
      "show": "common/customizeQuery/PurchaseOrder.select/execute",
      "detailPopup": "common/customizeQuery/PurchaseSelectGoods!/execute" // 明细弹框
    },
    "post": {
      "add": "purchase/purchaseOrder/add",
      "update": "purchase/purchaseOrder/update",
      "del": "purchase/purchaseOrder/delete",
      "audit": "purchase/purchaseOrder/audit",
      "unAudit": "purchase/purchaseOrder/unaudit"
    }
  },
  "detail": {
    "titleKey": "name", // 显示明细card header左上角显示的title
    "detailKey": "purchaseOrderDetailList", // 从表明细的key
    "detailPrimaryKey": {
      "add": "id", // 新增 弹出框数据回填主key
      "edit": "id" // 编辑 弹出框数据回填主key
    }
  },
  "popup": {
    "primaryKey": "id", // 弹出框的主key 用于单选或多选区分已选择的数据
    "subName": "name", // 弹出框 itemCard中右上角 header显示的 副标题
    "fields": [ // 弹出框 显示的字段
     
    ]
  },
  "list": {
    "fields": [ // 列表显示的字段
      
    ]
  },
  "add": {
    "fields": [ // 新增 主表form字段
      { "name": "billDate", "title": "入库日期", "type": "date", "required": true },
      { "name": "relatedPartyName", "title": "供应商名称", "type": "relatedParty", "required": true },
      { "name": "relatedPartyName", "title": "供应商名称", "type": "customer", "required": true },
      { "name": "warehouseId", "title": "入库仓库", "type": "warehouse", "required": true },
      { "name": "deliveryCode", "title": "发货单号", "type": "input" },
      { "name": "remark", "title": "备注", "type": "input" }
    ],
    "detailFields": [ // 新增 从表明细字段
      { "name": "batchNumber", "title": "批次号" },
      { "name": "goodsName", "title": "商品名称" },
      { "name": "goodsCode", "title": "商品编号" },
      { "name": "aliasCode", "title": "内部编号" },
      { "name": "purchaseQty", "title": "采购数量" },
      { "name": "qty", "title": "入库数量", "type": "input" },
      { "name": "masterUnit", "title": "单位" },
      { "name": "price", "title": "单价" },
      { "name": "amount", "title": "入库金额" },
      { "name": "warehouseAreaName", "title": "仓位" },
      { "name": "wrinkles", "title": "纹路" },
      { "name": "color", "title": "颜色" },
      { "name": "purpose", "title": "用途" },
      { "name": "packageModel", "title": "包装规格" },
      { "name": "pecification", "title": "规格型号" },
      { "name": "remark", "title": "备注" }
    ]
  },
  "edit": {
    "fields": [ // 编辑 主表form字段
     
    ],
    "detailFields": [ // 编辑 从表明细字段
    
    ]
  },
  "show": {
    "fields": [ // 详情 主表form字段
     
    ],
    "detailFields": [ // 详情 从表明细字段
     
    ]
  }
}
```
