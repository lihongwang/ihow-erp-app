<template>
  <view class="chart-page page-wrapper">
    <view class="page-content">
      <view class="charts-wrap">
        <bar />
        <view class="chart-item">
          <uni-section class="mb-10" title="销售额与采购额对比图" type="line">
            <PurchaseSale />
          </uni-section>
        </view>

        <view class="chart-item">
          <uni-section class="mb-10 sale-amount" title="本年客户销售额排名" type="line">
            <SaleAmount />
          </uni-section>
        </view>
        <view class="chart-item">
          <uni-section class="mb-10" title="本年商品销售排名" type="line">
            <ReportGoodsSaleOutRank />
          </uni-section>
        </view>
        <view class="chart-item report-stock">
          <uni-section class="mb-10" title="库龄统计" type="line">
            <ReportStockDays />
          </uni-section>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import bar from './bar'
import SaleAmount from './saleAmount'
import PurchaseSale from './purchaseSale'
import ReportStockDays from './reportStockDays'
import ReportGoodsSaleOutRank from './reportGoodsSaleOutRank'
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
