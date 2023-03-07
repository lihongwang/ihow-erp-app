<template>
  <view class="purchase-detail-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      title="采购入库单详情"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view v-if="formData" class="page-content">
      <uni-collapse v-model="accordionVal" @change="handleChange">
        <uni-collapse-item title="单据详情">
          <DetailCard>
            <template #header>
              <view class="flex flex-row justify-between items-center">
                <view class="card-title"> {{ formData.code }} </view>
                <view class="card-sub-title">
                  <uni-tag
                    :text="formData.auditStatusEnum?.name"
                    :type="statusList[formData.auditStatusEnum?.name]"
                  ></uni-tag>
                </view>
              </view>
            </template>
            <template #body>
              <view class="flex flex-col">
                <CardListItem
                  v-for="info in itemInfoArray"
                  :key="info.name"
                  :title="info.title"
                  :value="formData[info.name] || formData[info.aliasName]"
                  :type="info.type"
                  :params="info.params || {}"
                />
              </view>
            </template>
            <template #footer>
              <view gutter="16" class="flex flex-row justify-center">
                <button size="mini" type="primary" :disabled="!checkEditable()" @click="handleAddDetail">
                  添加明细
                </button>
              </view>
            </template>
          </DetailCard>
        </uni-collapse-item>
        <uni-collapse-item :title="'单据明细 (合计' + formData.goodsInDetailList?.length + '条)'">
          <view v-for="(item, index) in formData.goodsInDetailList" :key="index">
            <DetailCard :no-footer="true">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ `序号${index + 1} (${item.goodsName})` }} </view>
                  <view class="card-sub-title">
                    <ConfirmBtn :disabled="!checkEditable()" @onDelete="handleDeleteItem(item)" />
                  </view>
                </view>
              </template>
              <template #body>
                <view v-if="editable" class="flex flex-col">
                  <CardEditListItem
                    v-for="info in detailItemInfoArray"
                    :key="info.name"
                    :store="store"
                    :title="info.title"
                    :item="item"
                    :name="info.name"
                    :value="item[info.name] || item[info.aliasName]"
                    :type="info.type"
                    :params="info.params || {}"
                  />
                </view>
                <view v-else class="flex flex-col">
                  <CardListItem
                    v-for="info in detailItemInfoArray"
                    :key="info.name"
                    :title="info.title"
                    :value="item[info.name] || item[info.aliasName]"
                    :type="info.type"
                    :params="info.params || {}"
                  />
                </view>
              </template>
            </DetailCard>
          </view>
        </uni-collapse-item>
        <uni-collapse-item title="操作记录">
          <Timeline :data="formData.billOperationRecordList" :map="statusList" />
        </uni-collapse-item>
      </uni-collapse>
    </view>
    <PIDrawer ref="detailDrawerRef" @onConfirm="handleDetailConfirm" />
    <uni-popup ref="confirmDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancel-text="取消"
        confirm-text="确定"
        title="确认"
        content="确定删除？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
    <view :class="checkEditable() ? '' : 'un-editable'">
      <uni-fab
        ref="fab"
        :pattern="fabPattern"
        :content="getFabContent(editable)"
        horizontal="left"
        vertical="bottom"
        direction="horizontal"
        @trigger="trigger"
        @fabClick="fabClick"
      />
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import PIDrawer from '@/components/drawer/purchaseInDetail'
import DetailCard from '@/components/card/detailCard'
import ConfirmBtn from '@/components/button/confirm'
import CardListItem from '@/components/card/listItem'
import CardEditListItem from '@/components/card/editListItem'
import Timeline from '@/components/timeline/timeline'
import { detailItemInfoArray, itemInfoArray } from '@/store/properties/purchaseIn'
import { usePurchaseInStore } from '@/store/modules/purchaseIn'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { fixNumber } from '@/utils/data'
const editable = ref(false)
const accordionVal = ref(['0', '1'])
const confirmDialog = ref()
const handleChange = () => {}
const store = usePurchaseInStore()
const formData = ref(null)
const detailDrawerRef = ref()
const statusList = {
  未审核: 'info',
  已审核: 'success',
  审核: 'info',
  反审: 'success',
}
const getFabContent = (isEdit) => {
  return formData.value?.auditStatusEnum?.value == 1
    ? [
        isEdit
          ? {
              iconPath: '/static/images/save-blue.png',
              selectedIconPath: '/static/images/save-blue.png',
              text: '保存',
              active: false,
            }
          : {
              iconPath: '/static/images/edit.png',
              selectedIconPath: '/static/images/edit-blue.png',
              text: '编辑',
              active: false,
            },
        {
          iconPath: '/static/images/audit.png',
          selectedIconPath: '/static/images/audit-blue.png',
          text: '审核',
          active: false,
        },
        {
          iconPath: '/static/images/delete-red.png',
          selectedIconPath: '/static/images/delete-red.png',
          text: '删除',
          active: false,
        },
      ]
    : [
        {
          iconPath: '/static/images/unaudit.png',
          selectedIconPath: '/static/images/unaudit-blue.png',
          text: '反审核',
          active: false,
        },
      ]
}
const trigger = (e) => {
  if (formData.value?.auditStatusEnum?.value == 1) {
    if (e.index == 0) {
      if (editable.value) {
        handleSave()
      } else {
        editable.value = true
      }
    } else if (e.index == 1) {
      handleAudit(formData.value.id)
    } else if (e.index == 2) {
      handleDeleteCheck()
    }
  } else {
    if (e.index == 0) {
      handleUnAudit(formData.value.id)
    }
  }
}
const fabClick = () => {
  // uni.showToast({
  //   title: '点击了悬浮按钮',
  //   icon: 'none',
  // })
}
const checkEditable = () => {
  return editable.value && formData.value.auditStatusEnum?.value == 1
}

onLoad((option) => {
  fetchData(option.id)
})
store.$subscribe((mutation) => {
  const target = mutation.events.target
  if (mutation.events.key === 'qty') {
    target.amount = fixNumber(target.qty * target.price, 2)
  }
})
const fetchData = (id) => {
  store.show(id).then((data) => {
    formData.value = data
  })
}

const getSelectedItems = () => {
  return getDetails()
}
const handleAddDetail = () => {
  detailDrawerRef.value.open(getSelectedItems(), {
    warehouseId: formData.value.warehouseId,
    relatedPartyId: formData.value.relatedPartyId,
  })
}
const getDetails = () => {
  return store.getFormData().goodsInDetailList || []
}
const handleDeleteItem = (tmp) => {
  const details = getDetails()
  formData.value = store.setFormData({
    goodsInDetailList: details.filter((d) => d.id !== tmp.id),
  })
}
const handleAudit = async (id) => {
  await store.audit({ id })
  fetchData(id)
}
const handleUnAudit = async (id) => {
  await store.unAudit({ id })
  fetchData(id)
}
const handleDelete = async () => {
  await store.del()
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn/index',
  })
}
const handleDetailConfirm = ({ items }) => {
  const details = getDetails()
  formData.value = store.setFormData({
    goodsInDetailList: [
      ...items.map((d) => {
        const { $purchaseOrderCode, id, ...rest } = d
        return {
          ...rest,
          purchaseOrderCode: $purchaseOrderCode,
          purchaseOrderDetailId: id,
          purchaseQty: d.qty,
          amount: fixNumber(d.qty * d.price, 2),
        }
      }),
      ...details,
    ],
  })
}
const handleSave = async () => {
  await store.update()
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn/index',
  })
}
const back = () => {
  store.resetState()
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn/index',
  })
}

const handleDeleteCheck = () => {
  confirmDialog.value.open()
}
const dialogConfirm = async () => {
  await handleDelete()
  confirmDialog.value.close()
}
const dialogClose = () => {
  confirmDialog.value.close()
}
</script>

<style scoped lang="scss">
.page-content-wrap {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
