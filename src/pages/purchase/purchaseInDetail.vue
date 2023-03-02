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
      <uni-section title="单据详情" :right="false" :show-line="true" type="line">
        <Card>
          <template #header>
            <view class="flex flex-row justify-between items-center">
              <view class="card-title">
                {{ '编号：' + itemInfo.code }}
              </view>
              <view class="card-sub-title">
                <uni-tag
                  :text="statusList[itemInfo.status]?.text"
                  :type="statusList[itemInfo.status]?.type || 'success'"
                ></uni-tag>
              </view>
            </view>
          </template>
          <template #body>
            <view class="flex flex-col">
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">供 应 商 ：</text>
                <text>{{ itemInfo.supplier }}</text>
              </text>
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">联 系 人 ：</text>
                <text>{{ itemInfo.contact }}</text>
              </text>
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">联系电话：</text>
                <text>{{ itemInfo.phone }}</text>
                <text class="phone-fill" @tap="makePhoneCall"
                  >(<uni-icons type="phone-filled"></uni-icons>点击拨打)</text
                >
              </text>
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">交货方式：</text>
                <text>{{ typeList[itemInfo.type] && typeList[itemInfo.type].label }}</text>
              </text>
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">产品总数：</text>
                <text>{{ itemInfo.totalNums }}</text>
              </text>
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">制单时间：</text>
                <text>{{ itemInfo.createtime }}</text>
              </text>
              <text class="flex flex-row m-2 items-center justify-start">
                <text class="font-bold">应付金额：</text>
                <text>￥{{ itemInfo.money }}</text>
              </text>
            </view>
          </template>
        </Card>
      </uni-section>

      <uni-section title="单据明细" :right="false" :show-line="true" type="line">
        <view v-if="itemInfo?.productlist?.length > 0">
          <view v-for="(item, index) in itemInfo.productlist" :key="index" class="m-2">
            <Card :title="item.info.name" :sub-title="'￥' + item.subtotal" :thumb="item.url" margin="0rpx">
              <template #body>
                <view class="flex flex-col">
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">采购单价：</text>
                    <text>{{ item.price }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">采购数量：</text>
                    <text>{{ item.nums }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">单位：</text>
                    <text>{{ item.info.unit }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">现有库存：</text>
                    <text>{{ item.info.inventory }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">备注：</text>
                    <text>{{ item.remarks }}</text>
                  </text>
                </view>
              </template>
            </Card>
          </view>
        </view>
      </uni-section>
    </view>
  </view>
</template>

<script setup>
import Card from '@/components/card/index'
import Navbar from '@/components/pageNavbar'
import { usePurchaseInStore } from '@/store/modules/purchaseIn'
import { onLoad } from '@dcloudio/uni-app'
const store = usePurchaseInStore()
const itemInfo = store.detail || {}
console.log(store.detail)
onLoad((option) => {
  store.getById(option.id)
})
const statusList = [
  {
    text: '未审核',
    type: 'info',
  },
  {
    text: '审核失败',
    type: 'error',
  },
  {
    text: '待入库',
    type: 'warning',
  },
  {
    text: '已完成',
    type: 'success',
  },
]
const typeList = [
  {
    label: '买家自提',
  },
  {
    label: '卖家发货',
  },
  {
    label: '代发',
  },
]
const back = () => {
  store.resetDetail()
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn',
  })
}
const makePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: this.itemInfo.phone, //仅为示例
  })
}
</script>

<style scoped lang="scss">
.page-content-wrap {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}

.phone-fill {
  color: #ff070b;
}
</style>
