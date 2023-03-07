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
                <button
                  size="mini"
                  type="primary"
                  :disabled="formData.auditStatusEnum?.value == 4"
                  @click="handleEdit(formData.id)"
                >
                  {{ editable ? '保存' : '编辑' }}
                </button>
                <button
                  size="mini"
                  type="primary"
                  :disabled="formData.auditStatusEnum?.value == 4"
                  @click="handleAudit(formData.id)"
                >
                  审核
                </button>
                <button
                  size="mini"
                  type="primary"
                  :disabled="formData.auditStatusEnum?.value == 1"
                  @click="handleUnAudit(formData.id)"
                >
                  反审核
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
                    <ConfirmBtn @onDelete="handleDeleteItem(detailItem)" />
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
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
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
const statusList = {
  未审核: 'info',
  已审核: 'success',
  审核: 'info',
  反审: 'success',
}
const accordionVal = ref(['0', '1'])
const handleChange = () => {}
const store = usePurchaseInStore()
const formData = ref(null)
console.log(formData)
onLoad((option) => {
  fetchData(option.id)
})
store.$subscribe((mutation, state) => {
  const target = mutation.events.target
  if (mutation.events.key === 'qty') {
    target.amount = fixNumber(target.qty * target.price, 2)
    console.log(target.amount)
    setTimeout(() => {
      console.log(state.formData)
      formData.value = state.formData
    }, 100)
  }
})
const fetchData = (id) => {
  store.show(id).then((data) => {
    formData.value = data
  })
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
  store.resetState()
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
