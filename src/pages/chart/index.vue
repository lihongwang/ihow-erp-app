<template>
  <view class="chart-page page-wrapper">
    <view class="page-content">
      <view class="charts-wrap">
        <uni-collapse v-model="accordionVal">
          <uni-collapse-item title="销售额与采购额对比图">
            <view class="chart-item">
              <PurchaseSale :refresh="refresh" />
            </view>
          </uni-collapse-item>

          <uni-collapse-item title="本年客户销售额排名">
            <view class="chart-item">
              <SaleAmount :refresh="refresh" />
            </view>
          </uni-collapse-item>

          <uni-collapse-item title="本年商品销售排名">
            <view class="chart-item">
              <ReportGoodsSaleOutRank :refresh="refresh" />
            </view>
          </uni-collapse-item>

          <uni-collapse-item title="库龄统计">
            <view class="chart-item report-stock">
              <ReportStockDays :refresh="refresh" />
            </view>
          </uni-collapse-item>
          <uni-collapse-item title="利润分析">
            <view class="chart-item report-profit">
              <ReportProfit :refresh="refresh" />
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import SaleAmount from './saleAmount'
import PurchaseSale from './purchaseSale'
import ReportStockDays from './reportStockDays'
import ReportProfit from './reportProfit'
import ReportGoodsSaleOutRank from './reportGoodsSaleOutRank'
import { onShow, onReady } from '@dcloudio/uni-app'
const accordionVal = ref(['0', '1', '2', '3', '4'])
const refresh = ref(false)
onReady(() => {
  setTimeout(() => {
    refresh.value = !refresh.value
  }, 1000)
})
onShow(() => {
  refresh.value = !refresh.value
})
</script>

<style lang="scss">
::v-deep .chart-page {
  .info-content {
    box-sizing: border-box;
    padding: 1rem;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  .charts-wrap {
    position: relative;
    z-index: 100 !important;
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }
  canvas {
    position: relative;
    z-index: 100 !important;
  }
}

/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
.chart-item {
  width: 100%;
  // .sale-amount {
  //   height: 400px;
  // }
  // .report-stock {
  //   height: 400px;
  // }
}
</style>
