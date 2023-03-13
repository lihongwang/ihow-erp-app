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
    <uni-notice-bar show-close show-icon scrollable text="欢迎使用皓网ERP" />
    <view class="content-item info-content">
      <view class="info-item grid2">
        <InfoText title="今日销售" :money="true" extra="万元" :info="formatMoney(homeData?.todaySaleAmount)" />
        <InfoText title="今日采购" :money="true" extra="万元" :info="formatMoney(homeData?.totayPurchaseAmount)" />
      </view>
      <view class="info-item grid2">
        <InfoText title="本月销售" :money="true" extra="万元" :info="formatMoney(homeData?.monthSaleAmount)" />
        <InfoText title="本月采购" :money="true" extra="万元" :info="formatMoney(homeData?.monthPurchaseAmount)" />
      </view>
      <view class="info-item grid2">
        <InfoText title="本年销售" :money="true" extra="万元" :info="formatMoney(homeData?.yearSaleAmount)" />
        <InfoText title="本年采购" :money="true" extra="万元" :info="formatMoney(homeData?.yearPurchaseAmount)" />
      </view>

      <view class="info-item grid2">
        <InfoText title="采购未完成" :info="homeData?.unfinishedPurchaseOrder" extra="笔" />
        <InfoText title="销售未完成" :info="homeData?.unfinishedSaleOrder" extra="笔" />
      </view>
      <view class="info-item grid2">
        <InfoText title="库存数量" :info="homeData?.currentStockQty" />
        <InfoText title="库存金额" :money="true" extra="万元" :info="formatMoney(homeData?.currentStockAmount)" />
      </view>
    </view>
    <uni-section class="mb-10" title="采购" type="line">
      <view class="content-item action-content">
        <view class="info-item grid3">
          <view class="info-btn-wrap purchase-order" @click="handleClick('/subPages/purchase/purchaseOrder/index')">
            <img class="btn-img" src="/static/images/purchaseOrder.png" alt="采购订单" />
            <button class="normal-btn" size="mini">采购订单</button>
          </view>
          <view class="info-btn-wrap purchase-in" @click="handleClick('/subPages/purchase/purchaseIn/index')">
            <img class="btn-img" src="/static/images/warehouseIn.png" alt="采购入库" />
            <button class="normal-btn" size="mini">采购入库</button>
          </view>
          <view class="info-btn-wrap purchase-extra" @click="handleClick('/subPages/purchase/purchaseExtraIn/index')">
            <img class="btn-img" src="/static/images/purchase.png" alt="零采进货" />
            <button class="normal-btn" size="mini">零采进货</button>
          </view>
        </view>
      </view>
    </uni-section>
    <uni-section class="mb-10" title="销售" type="line">
      <view class="content-item action-content sale">
        <view class="info-item grid3">
          <view class="info-btn-wrap sale-order" @click="handleClick('/subPages/sale/saleOrder/index')">
            <img class="btn-img" src="/static/images/saleOrder.png" alt="销售订单" />
            <button class="normal-btn" size="mini">销售订单</button>
          </view>
          <view class="info-btn-wrap sale-out" @click="handleClick('/subPages/sale/saleOut/index')">
            <img class="btn-img" src="/static/images/saleOut.png" alt="销售出库" />
            <button class="normal-btn" size="mini">销售出库</button>
          </view>
          <view class="info-btn-wrap sale-extra" @click="handleClick('/subPages/sale/saleExtraOut/index')">
            <img class="btn-img" src="/static/images/sale.png" alt="零售出库" />
            <button class="normal-btn" size="mini">零售出库</button>
          </view>
        </view>
      </view>
    </uni-section>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
import InfoText from '@/components/infoCard/infoText'
import { getHomeData } from '@/apis'
import { onShow } from '@dcloudio/uni-app'
import { toMoney, fixNumber } from '@/utils/data'
const homeData = ref()
onShow(() => {
  getHomeData().then((data) => {
    setTimeout(() => {
      homeData.value = data
    }, 100)
  })
})
const formatMoney = (data) => {
  return toMoney(fixNumber(data / 10000, 2))
}
const handleClick = (url) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.home-page {
  .info-content {
    padding-top: 10px !important;
  }
  .info-content,
  .action-content {
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    &.sale {
      padding-bottom: 20px;
    }
    .info-item {
      margin-bottom: 5px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    ::v-deep .info-btn-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .btn-img {
        background: #007aff;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        padding: 10px;
        margin-bottom: 10px;
      }
      &.purchase-in .btn-img {
        background: #303f9f;
      }
      &.purchase-extra .btn-img {
        background: #29b6f6;
      }
      &.sale-order .btn-img {
        background: #009688;
      }
      &.sale-out .btn-img {
        background: #689f38;
      }
      &.sale-extra .btn-img {
        background: #fbc02d;
      }
    }
  }
}
</style>
