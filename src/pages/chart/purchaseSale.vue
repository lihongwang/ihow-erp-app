<template>
  <view v-if="chartOpts" class="charts-box">
    <uniChart :option="chartOpts" style="height: 300px" />
  </view>
</template>

<script setup>
import uniChart from '@/components/uniapp-echarts/components/uni-chart/uni-chart'
// import '@/components/uniapp-echarts/static/echarts.min.js'
// // #ifdef MP-WEIXIN
// const echarts = require('../../../components/uniapp-echarts/static/echarts.min.js')
// // #endif
import { ref } from 'vue'
import { useChart } from '@/hooks'
import { toMoney } from '@/utils/data'
const chartOpts = ref()
useChart({
  code: 'PurchaseSale!',
  format: (data = []) => {
    const salesData = []
    const purchaseData = []
    data.forEach((item) => {
      salesData[Number(item.MONTH)] = item.totalSaleAmount
      purchaseData[Number(item.MONTH)] = item.totalPurchaseAmount
    })
    chartOpts.value = {
      tooltip: {
        trigger: 'item',
        formatter: function (param) {
          const { name, value } = param
          return `${name}： ${toMoney(value)} 元`
        },
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        x: 15,
        y: 15,
        x2: 15,
        y2: 15,
        containLabel: true,
      },
      legend: {
        data: ['销售额', '采购额'],
        left: '45%',
        top: 50,
        textStyle: {
          color: '#666666',
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25,
      },
      xAxis: {
        name: '月',
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisLine: {
          lineStyle: {
            color: '#cdd5e2',
          },
        },
        axisLabel: {
          textStyle: {
            color: '#666666',
          },
        },
      },

      yAxis: [
        {
          name: '元',
          type: 'value',
          // axisLine: {
          //   show: false,
          //   lineStyle: {
          //     color: "#cdd5e2",
          //   },
          // },
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#666666',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#cdd5e2',
            },
          },
        },
      ],
      series: [
        {
          name: '销售额',
          type: 'bar',
          barWidth: '16px',
          itemStyle: {
            normal: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: '#ef6c00',
              //   },
              //   {
              //     offset: 1,
              //     color: '#ffe0b2',
              //   },
              // ]),
              barBorderRadius: 6,
            },
          },
          data: salesData || [],
        },

        {
          name: '采购额',
          type: 'bar',
          barWidth: '16px',
          itemStyle: {
            normal: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: '#29acff',
              //   },
              //   {
              //     offset: 1,
              //     color: '#4bdfff',
              //   },
              // ]),
              barBorderRadius: 6,
            },
          },
          data: purchaseData || [],
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
  height: 300px;
}
</style>
