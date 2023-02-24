<template>
  <view class="chart-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      title="统计图表"
      title-color="#fff"
      :background="background"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <view class="info-content">
        <InfoCard title="采购汇总" info="2000" />
        <InfoCard title="采购退货汇总" info="2000" />
        <InfoCard title="销售汇总" info="2000" />
        <InfoCard title="销售退货汇总" info="2000" />
      </view>

      <view class="charts-wrap">
        <view class="chart-item">
          <QiunCharts type="line" :chart-data="chartData" :error-show="false" background="none" />
        </view>
        <view class="chart-item"><Column /></view>
        <view class="chart-item"><Pie /></view>
        <view class="chart-item"><Line /></view>
        <view class="chart-item"><Area /></view>
        <view class="chart-item"><Mount /></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import QiunCharts from '@/components/charts/qiun-data-charts/qiun-data-charts'
import InfoCard from '@/components/infoCard'
import Pie from '@/components/charts/pie'
import Column from '@/components/charts/column'
import Line from '@/components/charts/line'
import Area from '@/components/charts/area'
import Mount from '@/components/charts/mount'
const chartData = {
  categories: [],
  series: [
    {
      name: '采购',
      data: [10, 0, 0, 0, 0, 10],
    },
    {
      name: '采购退货',
      data: [20, 0, 0, 0, 0, 30],
    },
    {
      name: '销售',
      data: [30, 0, 0, 0, 0, 40],
    },
    {
      name: '销售退货',
      data: [40, 0, 0, 0, 0, 60],
    },
  ],
}
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

.content {
  padding: 10px 10px;
}

.grid-text {
  font-size: 28rpx;
  margin-top: 4rpx;
}

.m_top15 {
  margin-top: 15px;
}

.m_top25 {
  margin-top: 25px;
}

.m_top5 {
  margin-top: 5px;
}

.u-grid-item-img {
  margin: 0 auto;
  display: block;
  padding: 5px 0;
  width: 28px;
  height: 28px;
}

.color-box {
  /* padding: 0 15px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-align: center;
  margin-top: 20rpx;
}

.color-item {
  display: flex;
  flex: 1;
  margin: 0 8rpx;
  flex-direction: column;
  border-radius: 6rpx;
  padding: 12rpx 0;
  height: 75px;
}

.bg1 {
  background: linear-gradient(-125deg, #67c707, #a7f968);
}

.bg2 {
  background: linear-gradient(-125deg, #16a8cc, #1bd0fd);
}

.bg3 {
  background: linear-gradient(-125deg, #e29811, #f1cf71);
}

.bg4 {
  background: linear-gradient(-125deg, #cc16b6, #d496d8);
}

.color-title {
  font-size: 30px;
  /* line-height: 75px; */
  height: 75px;
}

.color-value {
  font-size: 24rpx;
}
/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
.chart-item {
  width: 100%;
  height: 300px;
}
</style>
