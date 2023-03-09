<template>
  <view v-if="chartOpts" class="charts-box">
    <uniChart :option="chartOpts" style="height: 400px" />
  </view>
</template>

<script setup>
import uniChart from 'uniapp-echarts/components/uni-chart/uni-chart'
// #ifdef VUE2 || MP-WEIXIN
const echarts = require('uniapp-echarts/static/echarts.min.js')
// #endif
import 'uniapp-echarts/static/echarts.min.js'
import { fixNumber, toMoney } from '@/utils/data'
import { ref } from 'vue'
import { useChart } from '@/hooks'
const chartOpts = ref()
useChart({
  code: 'ReportStockDays',
  format: (data) => {
    const values = []
    const labels = []
    const listData = data?.list || []
    listData.forEach((item) => {
      values.push(item.remainQty)
      labels.push(item.stockDays)
    })
    chartOpts.value = {
      backgroundColor: '#fff',
      xAxis: {
        show: false,
      },
      tooltip: {
        show: true,
        formatter: function (param) {
          const { name, value } = param
          return `${name}： ${toMoney(value)} 元`
        },
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
              fontSize: '14',
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
              fontSize: '16',
            },
            formatter: function (value) {
              return `${toMoney(fixNumber(Number(value), 2))} 元`
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          data: values,
          barWidth: 18,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#ff8a80',
                },
                {
                  offset: 1,
                  color: '#d50000',
                },
              ]),
            },
          },
        },
      ],
    }
  },
})
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
}
</style>
