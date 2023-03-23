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
        <InfoText
          title="今日销售"
          :money="true"
          class="cur"
          extra="万元"
          :info="formatMoney(homeData?.todaySaleAmount)"
        />
        <InfoText
          title="今日采购"
          :money="true"
          class="cur"
          extra="万元"
          :info="formatMoney(homeData?.totayPurchaseAmount)"
        />
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
        <InfoText title="采购未完成" class="color-red enhance" :info="homeData?.unfinishedPurchaseOrder" extra="笔" />
        <InfoText title="销售未完成" class="color-red enhance" :info="homeData?.unfinishedSaleOrder" extra="笔" />
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
  ::v-deep .color-red {
    .num {
      color: #ef4444 !important;
    }
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
    ::v-deep .cur {
      position: relative;
      overflow: hidden;
      background-color: transparent;
      border-radius: 6px;
      .info-text {
        border-width: 2px !important;
        border-color: #06b6d4 !important;
      }
      .num {
        color: #06b6d4;
      }
    }
    ::v-deep .enhance {
      position: relative;
      overflow: hidden;
      background-color: transparent;
      border-radius: 6px;
      .info-text {
        border-width: 2px !important;
        border-color: #ef4444 !important;
      }
      &:before {
        position: absolute;
        right: -12px;
        top: -12px;
        width: 24px;
        height: 24px;
        content: '';
        background-color: #ef4444;
        transform: rotate(45deg);
        box-sizing: border-box;
      }
    }
    ::v-deep .info-btn-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #d9d9d9;
      padding-top: 15px;
      padding-bottom: 5px;
      border-radius: 6px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
