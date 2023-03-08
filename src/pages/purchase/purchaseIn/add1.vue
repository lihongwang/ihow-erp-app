<template>
  <view class="purchaseIn-page main-add-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      :title="titleInfo.add"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-forms :model="item" label-width="100px">
        <uni-forms-item label="入库日期">
          <uni-datetime-picker v-model="formData.billDate" type="date" :clear-icon="false" />
        </uni-forms-item>
        <uni-forms-item required label="供应商名称">
          <RelatedPartyItem @onSelect="handleSelectRelatedParty" />
        </uni-forms-item>
        <uni-forms-item required label="入库仓库">
          <uni-data-select v-model="formData.warehouseId" :localdata="warehouseList"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="发货单号">
          <uni-easyinput v-model="formData.deliveryCode" class="list-val" />
        </uni-forms-item>
        <uni-forms-item label="备  注">
          <uni-easyinput v-model="formData.remark" class="list-val" />
        </uni-forms-item>
        <button type="primary" @click="handleAddDetail">添加明细</button>
        <view class="detail-list">
          <view v-for="(detailItem, index) in formData.goodsInDetailList" :key="index">
            <DetailCard :no-footer="true">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ `序号${index + 1} (${detailItem.goodsName})` }} </view>
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
                    :item="detailItem"
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
    <view class="save-btn" title="保存" @click="handleSave">
      <img class="save-img" src="/static/images/save-blue.png" alt="保存" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
import PIDrawer from '@/components/drawer/purchaseInDetail'
import RPDrawer from '@/components/drawer/relatedParty.vue'
import DetailCard from '@/components/card/detailCard'
import ConfirmBtn from '@/components/button/confirm'
import CardEditListItem from '@/components/card/editListItem'
import RelatedPartyItem from '@/components/form/relatedParty'
import { detailItemInfoArray } from '@/store/properties/purchaseIn'
import { usePurchaseInStoreWithOut } from '@/store/modules/purchaseIn'
import { fixNumber } from '@/utils/data'
import { useAmount, useRelatedParty, useWarehouse, usePage, useAddPage } from '@/hooks'
import pageInfo from '@/pageInfo/purchaseIn.json'
console.log(JSON.stringify(detailItemInfoArray))
const store = usePurchaseInStoreWithOut()
const detailDlg = ref()
const detailDrawerRef = ref()
const formData = ref(store.getFormData())
const warehouseList = ref([])
// 仓库下拉列表数据获取
useWarehouse((data) => (warehouseList.value = data))
// 监听明细qty，联动计算amount
useAmount(store)
// page navbar title，返回的页面
const { back, titleInfo } = usePage({
  pageInfo,
  title: pageInfo.title,
  backUrl: pageInfo.url.index,
})
// 页面处理逻辑
const { handleAddDetail, handleDeleteItem, handleDetailConfirm, handleSave } = useAddPage({
  back,
  formData,
  detailDrawerRef,
  store,
  detailKey: pageInfo.detail.detailKey, // 明细key
  detailPrimaryKey: pageInfo.detail.detailPrimaryKey.add, // 明细回填key
  detailFilterInfo: {
    // 点添加明细，需要传递的前置条件
    message: '请先选择供应商和仓库',
    keys: ['relatedPartyId', 'warehouseId'],
  },
  formatDetail: (d) => {
    // 弹出框点确定时，数据转换
    const { $purchaseOrderCode, id, ...rest } = d
    return {
      ...rest,
      purchaseOrderCode: $purchaseOrderCode,
      purchaseOrderDetailId: id,
      purchaseQty: d.qty,
      amount: fixNumber(d.qty * d.price, 2),
    }
  },
})
// 供应商弹框，将值添加到formData
const handleSelectRelatedParty = (relatedParty) => {
  formData.value = useRelatedParty(store, relatedParty)
}
</script>

<style scoped lang="scss"></style>
