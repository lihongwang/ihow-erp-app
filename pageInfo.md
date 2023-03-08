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
    "searchKey": "code1" // 列表页 搜索的code key
  },
  "api": { // 后台api
    "get": {
      "list": "common/customizeQuery/PurchaseOrder/execute",
      "show": "common/customizeQuery/PurchaseOrder.select/execute",
      "detailPopup": "common/customizeQuery/PurchaseSelectGoods!/execute"
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
     
    ],
    "detailFields": [ // 新增 从表明细字段
     
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
