<template>
  <view class="purchaseIn-page main-edit-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      :title="titleInfo.edit"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-forms :model="item" label-width="100px">
        <view class="main-form-field">
          <uni-forms-item
            v-for="field in formFields"
            :key="field.name"
            :disabled="field.disabled"
            :label="field.title"
            :required="field.required"
          >
            <FormField
              :field="field"
              :type="field.type"
              :name="field.name"
              :item="formData"
              :field-context="fieldContext"
            />
          </uni-forms-item>
          <button type="primary" size="mini" @click="handleAddDetail">添加明细</button>
        </view>

        <view class="detail-list">
          <view v-for="(detailItem, index) in formData[detailKey]" :key="index">
            <DetailCard :no-footer="true">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ `序号${index + 1} (${detailItem[detailTitleKey]})` }} </view>
                  <view class="card-sub-title">
                    <ConfirmBtn @onDelete="handleDeleteItem(detailItem)" />
                  </view>
                </view>
              </template>
              <template #body>
                <view class="flex flex-col">
                  <EditListItem
                    v-for="info in detailFields"
                    :key="info.name"
                    :store="store"
                    :field="info"
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
    <PopupDetailDrawer
      ref="detailDrawerRef"
      :primary-key="detailPrimaryKey"
      :check-key="detailCheckKey"
      :search-key="detailSearchKey"
      :search-placeholder="detailSearchPlaceholder"
      :store="store"
      @onConfirm="handleDetailConfirm"
    />
    <view class="save-btn" title="保存" @click="handleSave">
      <img class="save-img" src="/static/images/save-blue.png" alt="保存" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
import PopupDetailDrawer from '@/components/drawer/detail'
import DetailCard from '@/components/card/detailCard'
import ConfirmBtn from '@/components/button/confirm'
import FormField from '@/components/form/FormField'
import EditListItem from '@/components/list/editListItem'
import { usePurchaseInStoreWithOut } from '@/store/modules/purchaseIn'
import { fixNumber } from '@/utils/data'
import { useSubscribe, useRelatedParty, useWarehouse, usePage, useEditPage } from '@/hooks'
import pageInfo from '@/pageInfo/purchaseIn.json'
const formFields = pageInfo.edit.fields
const detailFields = pageInfo.edit.detailFields
const detailKey = pageInfo.detail.detailKey
const detailTitleKey = pageInfo.detail.titleKey
const detailPrimaryKey = pageInfo.detail.detailPrimaryKey
const detailCheckKey = pageInfo.detail.detailCheckKey
const detailSearchKey = pageInfo.detail.detailSearchKey
const detailSearchPlaceholder = pageInfo.detail.detailSearchPlaceholder
const store = usePurchaseInStoreWithOut()
const detailDrawerRef = ref()
const formData = ref(store.getFormData())
// 供应商弹框，将值添加到formData
const handleSelectRelatedParty = (relatedParty) => {
  formData.value = useRelatedParty(store, relatedParty)
}
// field需要用到方法或者属性
const fieldContext = ref({
  handleSelectRelatedParty,
})
// 仓库下拉列表数据获取
useWarehouse((data) => (fieldContext.value.warehouseList = data))
// 监听明细qty，联动计算amount
useSubscribe(store)
// page navbar title，返回的页面
const { back, titleInfo } = usePage({
  pageInfo,
  title: pageInfo.title,
  backUrl: pageInfo.url.index,
})
// 页面处理逻辑
const { handleAddDetail, handleDeleteItem, handleDetailConfirm, handleSave } = useEditPage({
  back,
  detailDrawerRef,
  detailKey, // 明细key
  formData,
  detailFilterInfo: {
    // 点添加明细，需要传递的前置条件
    message: '请先选择供应商和仓库',
    keys: ['relatedPartyId', 'warehouseId'],
  },
  formatDetail: (d) => {
    // 弹出框点确定时，数据转换
    const { $purchaseOrderCode, id, ...rest } = d
    return {
      id,
      ...rest,
      purchaseOrderCode: $purchaseOrderCode,
      purchaseOrderDetailId: id,
      purchaseQty: d.qty,
      amount: fixNumber(d.qty * d.price, 2),
    }
  },
  store,
})
</script>

<style scoped lang="scss"></style>
