<template>
  <view class="home-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      back-text="皓网ERP"
      title="皓网ERP"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    >
    </Navbar>
    <uni-notice-bar
      show-close
      show-icon
      scrollable
      text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
    />
    <uni-collapse v-model="accordionVal" @change="handleChange">
      <uni-collapse-item title="统计数据">
        <view class="collapse-item info-content">
          <view class="info-item grid3">
            <InfoCard title="今日采购额" :money="true" :info="homeData.totayPurchaseAmount" />
            <InfoCard title="本月采购额" :money="true" :info="homeData.monthPurchaseAmount" />
            <InfoCard title="本年采购额" :money="true" :info="homeData.yearPurchaseAmount" />
          </view>
          <view class="info-item grid3">
            <InfoCard title="今日销售额" :money="true" :info="homeData.todaySaleAmount" />
            <InfoCard title="本月销售额" :money="true" :info="homeData.monthSaleAmount" />
            <InfoCard title="本年销售额" :money="true" :info="homeData.yearSaleAmount" />
          </view>
          <view class="info-item grid2">
            <InfoCard title="未完成采购订单" :info="homeData.unfinishedPurchaseOrder" />
            <InfoCard title="未完成销售订单" :info="homeData.unfinishedSaleOrder" />
          </view>
          <view class="info-item grid2">
            <InfoCard title="当前库存数量" :info="homeData.currentStockQty" />
            <InfoCard title="当前库存金额" :money="true" :info="homeData.currentStockAmount" />
          </view>
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="导航">
        <view class="collapse-item action-content">
          <view class="info-item grid3">
            <button size="mini" type="primary" @click="handleClick('/pages/purchase/purchaseOrder')">采购订单</button>
            <button size="mini" type="primary" @click="handleClick('/pages/purchase/purchaseIn/index')">
              采购入库
            </button>
            <button size="mini" type="primary" @click="handleClick('/pages/purchase/purchaseExtraIn')">零采进货</button>
          </view>
          <view class="info-item grid3">
            <button size="mini" type="primary" @click="handleClick('/pages/sale/saleOrder')">销售订单</button>
            <button size="mini" type="primary" @click="handleClick('/pages/sale/saleOut')">销售出库</button>
            <button size="mini" type="primary" @click="handleClick('/pages/sale/saleExtraOut')">零售出库</button>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
import InfoCard from '@/components/infoCard'
import { getHomeData } from '@/apis'
import { onShow } from '@dcloudio/uni-app'
const homeData = ref({})
onShow(() => {
  console.log(111)
  getHomeData().then((data) => {
    console.log(data)
    homeData.value = data
  })
})
const accordionVal = ref(['0', '1', '2', '3', '4'])
const handleChange = () => {}
const handleClick = (url) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.home-page {
  .info-content,
  .action-content {
    display: flex;
    flex-direction: column;
    .info-item {
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .collapse-item {
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
