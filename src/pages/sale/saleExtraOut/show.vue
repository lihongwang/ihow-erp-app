<template>
  <view class="purchase-detail-page main-show-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      :title="titleInfo.show"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view v-if="formData" class="page-content">
      <uni-collapse v-model="accordionVal" @change="handleChange">
        <uni-collapse-item title="单据详情">
          <DetailCard :no-footer="true">
            <template #header>
              <view class="flex flex-row justify-between items-center">
                <view class="card-title"> {{ formData.code }} </view>
                <view class="card-sub-title">
                  <Tag :text="formData.auditStatusEnum?.name" />
                </view>
              </view>
            </template>
            <template #body>
              <view class="flex flex-col">
                <ListItem
                  v-for="info in formFields"
                  :key="info.name"
                  :title="info.title"
                  :value="formData[info.name] || formData[info.aliasName]"
                  :type="info.type"
                  :params="info.params || {}"
                />
              </view>
            </template>
          </DetailCard>
        </uni-collapse-item>
        <uni-collapse-item :title="'单据明细 (合计' + formData[detailKey]?.length + '条)'">
          <view v-for="(item, index) in formData[detailKey]" :key="index">
            <DetailCard :no-footer="true">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ `序号${index + 1} (${item[detailTitleKey]})` }} </view>
                </view>
              </template>
              <template #body>
                <view class="flex flex-col">
                  <ListItem
                    v-for="info in detailFields"
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
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
import DetailCard from '@/components/card/detailCard'
import ListItem from '@/components/list/listItem'
import Tag from '@/components/tag'
import Timeline from '@/components/timeline/timeline'
import { statusList } from '@/utils/status'
import { useSaleExtraOutStoreWithOut } from '@/store/modules/saleExtraOut'
import { usePage, useShowPage } from '@/hooks'
import pageInfo from '@/pageInfo/saleExtraOut.json'
const formFields = pageInfo.show.fields
const detailFields = pageInfo.show.detailFields
const detailKey = pageInfo.detail.detailKey
const detailTitleKey = pageInfo.detail.titleKey
const accordionVal = ref(['0', '1'])
const handleChange = () => {}
const confirmDialog = ref()
const store = useSaleExtraOutStoreWithOut()
const formData = ref(null)
const { back, titleInfo } = usePage({
  pageInfo,
  title: pageInfo.title,
  backUrl: pageInfo.url.index,
})
const { fabClick, getFabContent, trigger, dialogConfirm, dialogClose } = useShowPage({
  formData,
  confirmDialog,
  editUrl: pageInfo.url.edit,
  store,
})
</script>

<style scoped lang="scss"></style>
