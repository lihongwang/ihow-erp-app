<template>
  <view v-if="chartOpts" class="charts-box">
    <uniChart :option="chartOpts" canvas-id="reportGoodsChart" class="chart-item-wrap">
      <view class="placeholder"></view>
    </uniChart>
  </view>
</template>

<script setup>
import uniChart from '@/components/uniapp-echarts/components/uni-chart/uni-chart'
// import '@/components/uniapp-echarts/static/echarts.min.js'
// // #ifdef MP-WEIXIN
// const echarts = require('../../../components/uniapp-echarts/static/echarts.min.js')
// // #endif
import { fixNumber, toMoney } from '@/utils/data'
import { ref, defineProps } from 'vue'
import { useChart } from '@/hooks'
import dayjs from 'dayjs'
const props = defineProps(['refresh'])
const chartOpts = ref()
const year = new Date().getFullYear()
useChart({
  props,
  code: 'ReportGoodsSaleOutRank',
  params: {
    fromBillDate: dayjs(`${year}-01-01`).format('YYYY-MM-DD 00:00:00'),
  },
  format: (data) => {
    const values = []
    const labels = []
    const listData = data?.list || []
    let len
    if (listData.length < 10) len = listData.length
    listData
      .sort((a, b) => a.outQty - b.outQty)
      .slice(0, 10)
      .forEach((item, index) => {
        values.push(item.outQty)
        labels.push(`No.${(len || 10) - index} ${item.goodsName}`)
      })
    chartOpts.value = {
      backgroundColor: '#fff',
      xAxis: {
        show: false,
      },

      grid: {
        x: 15,
        y: 15,
        x2: 15,
        y2: 15,
      },

      yAxis: [
        {
          splitLine: 'none',
          axisLine: 'none',
          axisLabel: {
            verticalAlign: 'bottom',
            align: 'left',
            padding: [0, 0, 15, 10], //文字与柱状图的距离
            textStyle: {
              color: '#333',
              fontWeight: 'normal',
              fontSize: '18px',
            },
          },
          data: labels,
        },
        {
          axisLine: 'none',
          data: values,
          axisLabel: {
            show: true,
            verticalAlign: 'bottom',
            align: 'right',
            padding: [0, 10, 15, 0], //数据与图形的距离
            textStyle: {
              color: '#333',
              fontWeight: 'bold',
              fontSize: '18px',
            },
            formatter: function (value) {
              return `${toMoney(fixNumber(Number(value), 2))} 件`
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          data: values,
          barWidth: '18px',
          itemStyle: {
            normal: {
              color: '#42a5f5',
              // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              //   {
              //     offset: 0,
              //     color: '#bbdefb',
              //   },
              //   {
              //     offset: 1,
              //     color: '#42a5f5',
              //   },
              // ]),
              barBorderRadius: 6,
            },
          },
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 500px;
  // #ifdef MP-WEIXIN
  height: 300px;
  // #endif
}
</style>
