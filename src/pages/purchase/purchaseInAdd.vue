<template>
  <view class="purchase-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      title="新增采购入库单"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-forms :model="item" label-width="80px">
        <uni-forms-item label="入库日期">
          <uni-datetime-picker v-model="item.inDate" type="date" :clear-icon="false" />
        </uni-forms-item>
        <uni-forms-item label="供应商名称">
          <RelatedPartyItem @onSelect="handleSelectRelatedParty" />
        </uni-forms-item>
        <uni-forms-item label="仓库">
          <uni-data-select v-model="item.warehouseId" :localdata="warehouseList"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="备注">
          <uni-easyinput v-model="item.remark" class="list-val" />
        </uni-forms-item>
        <button type="primary" @click="handleAddDetail(item.id)">添加明细</button>
        <view class="detail-list">
          <view v-for="(detailItem, index) in details" :key="index">
            <DetailCard :no-footer="true">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ `序号${index} (${detailItem.goodsName})` }} </view>
                  <view class="card-sub-title">
                    <ConfirmBtn @onDelete="handleDeleteItem(detailItem)" />
                  </view>
                </view>
              </template>
              <template #body>
                <view class="flex flex-col">
                  <CardEditListItem
                    v-for="info in detailItemInfoArray"
                    :key="info.name"
                    :store="store"
                    :title="info.title"
                    :model="detailItem"
                    :name="info.name"
                    :value="detailItem[info.name] || detailItem[info.aliasName]"
                    :type="info.type"
                    :params="info.params || {}"
                  />
                </view>
              </template>
            </DetailCard>
          </view>
        </view>
      </uni-forms>
    </view>
    <PIDrawer ref="detailDrawerRef" @onConfirm="handleDetailConfirm" />
    <RPDrawer ref="relatedPartyDrawerRef" @onConfirm="handleRelatedPartyConfirm" />
    <view>
      <uni-popup ref="detailDlg" type="dialog">
        <uni-popup-dialog
          type="info"
          cancel-text="取消"
          confirm-text="确定"
          title="添加明细"
          @confirm="dialogConfirm"
          @close="dialogClose"
        >
          <view>detail</view>
        </uni-popup-dialog>
      </uni-popup>
    </view>

    <uni-fab ref="fab" horizontal="right" vertical="bottom" direction="horizontal" @fabClick="handleSave" />
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import PIDrawer from '@/components/drawer/purchaseInDetail'
import RPDrawer from '@/components/drawer/relatedParty.vue'
import DetailCard from '@/components/card/detailCard'
import ConfirmBtn from '@/components/button/confirm'
import { detailItemInfoArray } from '@/store/properties/purchaseIn'
import { usePurchaseInStoreWithOut } from '@/store/modules/purchaseIn'
import CardEditListItem from '@/components/card/editListItem'
import RelatedPartyItem from '@/components/form/relatedParty'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getWarehouseData } from '@/apis'
// Array.from({ length: 10000 }).fill((item, i) => ({ id: i, value: i }))
const store = usePurchaseInStoreWithOut()
const detailDlg = ref()
const detailDrawerRef = ref()
const item = ref({
  inDate: new Date(),
})
const details = ref([])
const warehouseList = ref([])
const handleSelectRelatedParty = (relatedParty) => {
  item.value.relatedPartyId = relatedParty.id
  item.value.relatedPartyName = relatedParty.name
}
onLoad(() => {
  getWarehouseData().then((res) => {
    warehouseList.value = res.map((w) => ({ value: w.id, text: w.name }))
  })
})
const handleAddDetail = () => {
  detailDrawerRef.value.open(getSelectedItems(), {
    warehouseId: item.value.warehouseId,
    relatedPartyId: item.value.relatedPartyId,
  })
}
const handleDeleteItem = (tmp) => {
  details.value = details.value.filter((d) => d.id !== tmp.id)
}
const getSelectedItems = () => {
  return details.value
}
const handleDetailConfirm = ({ items }) => {
  details.value = [
    ...items.map((d) => {
      return {
        ...d,
        purchaseQty: d.qty,
      }
    }),
    ...details.value,
  ]
  store.setEditData(details.value)
}
const handleSave = () => {
  console.log(item)
  console.log(details)
  detailDlg.value.open()
  // messageDlg.value.open()
}
const back = () => {
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn',
  })
}
</script>

<style scoped lang="scss">
.page-content {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
