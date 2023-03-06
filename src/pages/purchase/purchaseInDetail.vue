<template>
  <view class="purchase-detail-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      title="采购订单详情"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view v-if="itemInfo" class="page-content">
      <uni-collapse v-model="accordionVal" @change="handleChange">
        <uni-collapse-item title="单据详情">
          <DetailCard>
            <template #header>
              <view class="flex flex-row justify-between items-center">
                <view class="card-title"> {{ itemInfo.code }} </view>
                <view class="card-sub-title">
                  <uni-tag
                    :text="itemInfo.auditStatusEnum.name"
                    :type="statusList[itemInfo.auditStatusEnum.name]"
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
                  :value="itemInfo[info.name] || itemInfo[info.aliasName]"
                  :type="info.type"
                  :params="info.params || {}"
                />
              </view>
            </template>
            <template #footer>
              <view gutter="16" class="flex flex-row justify-center">
                <button
                  size="mini"
                  type="primary"
                  :disabled="itemInfo.auditStatusEnum?.value == 4"
                  @click="handleEdit(itemInfo.id)"
                >
                  {{ editable ? '保存' : '编辑' }}
                </button>
                <button
                  size="mini"
                  type="primary"
                  :disabled="itemInfo.auditStatusEnum?.value == 4"
                  @click="handleAudit(itemInfo.id)"
                >
                  审核
                </button>
                <button
                  size="mini"
                  type="primary"
                  :disabled="itemInfo.auditStatusEnum?.value == 1"
                  @click="handleUnAudit(itemInfo.id)"
                >
                  反审核
                </button>
              </view>
            </template>
          </DetailCard>
        </uni-collapse-item>
        <uni-collapse-item :title="'单据明细 (合计' + itemInfo.goodsInDetailList?.length + '条)'">
          <view v-for="(item, index) in itemInfo.goodsInDetailList" :key="index">
            <DetailCard :no-footer="true">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ item.batchNumber }} </view>
                </view>
              </template>
              <template #body>
                <view v-if="editable" class="flex flex-col">
                  <CardEditListItem
                    v-for="info in detailItemInfoArray"
                    :key="info.name"
                    :title="info.title"
                    :model="item"
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
          <Timeline :data="itemInfo.billOperationRecordList" :map="statusList" />
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import DetailCard from '@/components/card/detailCard'
import CardListItem from '@/components/card/listItem'
import CardEditListItem from '@/components/card/editListItem'
import Timeline from '@/components/timeline/timeline'
import { detailItemInfoArray } from '@/store/properties/purchaseIn'
import { usePurchaseInStore, itemInfoArray } from '@/store/modules/purchaseIn'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const editable = ref(false)
const statusList = {
  未审核: 'info',
  已审核: 'success',
  审核: 'info',
  反审: 'success',
}
const accordionVal = ref(['0', '1'])
const handleChange = () => {}
const store = usePurchaseInStore()
const itemInfo = ref()
onLoad((option) => {
  fetchData(option.id)
})
const fetchData = async (id) => {
  itemInfo.value = await store.getById(id)
}
const handleEdit = () => {
  if (editable.value) {
    editable.value = false
  } else {
    editable.value = true
  }
}
const handleAudit = async (id) => {
  await store.audit({ id })
  setTimeout(() => {
    fetchData(id)
  }, 100)
}
const handleUnAudit = async (id) => {
  await store.unAudit({ id })
  setTimeout(() => {
    fetchData(id)
  }, 100)
}

const back = () => {
  store.resetDetail()
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn',
  })
}
</script>

<style scoped lang="scss">
.page-content-wrap {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
