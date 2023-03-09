<template>
  <view class="report-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      title="报表"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-section title="库存报表" :right="false" :show-line="true" type="line">
        <view class="info-item grid2">
          <button size="mini" type="primary" @click="handleClick('/pages/report/reportStockDetail')">
            库存汇总报表
          </button>
          <button size="mini" type="primary" @click="handleClick('/pages/report/reportSafeQty')">库存预警报表</button>
        </view>
      </uni-section>
      <uni-section title="进度报表" :right="false" :show-line="true" type="line">
        <view class="info-item grid2">
          <button size="mini" type="primary" @click="handleClick('/pages/report/saleOrderProcess')">
            销售订单进度
          </button>
          <button size="mini" type="primary" @click="handleClick('/pages/report/purchaseOrderProcess')">
            采购订单进度
          </button>
        </view>
      </uni-section>
      <uni-section title="财务报表" :right="false" :show-line="true" type="line">
        <view class="info-item grid2">
          <button size="mini" type="primary" @click="handleClick('/pages/report/reportReceivable')">应收款明细</button>
          <button size="mini" type="primary" @click="handleClick('/pages/report/reportPayable')">应付款明细</button>
        </view></uni-section
      >
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
const handleClick = (url) => {
  uni.navigateTo({
    url,
  })
}
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  button {
    width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
