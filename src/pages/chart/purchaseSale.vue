<template>
  <view v-if="chartOpts" class="charts-box">
    <uniChart :option="chartOpts" canvas-id="purchaseSaleChart" />
  </view>
</template>

<script setup>
import uniChart from '@/components/uniapp-echarts/components/uni-chart/uni-chart'
// import '@/components/uniapp-echarts/static/echarts.min.js'
// // #ifdef MP-WEIXIN
// const echarts = require('../../../components/uniapp-echarts/static/echarts.min.js')
// // #endif
import { ref, defineProps } from 'vue'
import { useChart } from '@/hooks'
import { toMoney, fixNumber } from '@/utils/data'
const props = defineProps(['refresh'])

const chartOpts = ref()

useChart({
  props,
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
          return `${name}： ${toMoney(fixNumber(value / 10000, 2))} 万元`
        },
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        x: 15,
        y: 35,
        x2: 25,
        y2: 15,
        containLabel: true,
      },
      legend: {
        data: ['销售额', '采购额'],
        left: '45%',
        top: 10,
        textStyle: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '18px',
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25,
      },
      xAxis: {
        name: '月',
        nameGap: 5,
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisLine: {
          lineStyle: {
            color: '#cdd5e2',
          },
        },
        axisLabel: {
          textStyle: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '18px',
          },
        },
      },

      yAxis: [
        {
          show: true,
          name: '万元',
          nameGap: 10,
          nameTextStyle: {
            padding: [0, 0, 5, -35],
          },
          type: 'value',
          // axisLine: {
          //   show: false,
          //   lineStyle: {
          //     color: "#cdd5e2",
          //   },
          // },
          axisLabel: {
            textStyle: {
              color: '#333',
              fontWeight: 'bold',
              fontSize: '18px',
            },
            formatter: function (value) {
              return `${toMoney(fixNumber(Number(value) / 10000, 2))}`
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
          barWidth: '12px',
          itemStyle: {
            normal: {
              color: '#ef6c00',
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
          barWidth: '12px',
          itemStyle: {
            normal: {
              color: '#29acff',
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

<style lang="scss" scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 300px;
  // #ifdef MP-WEIXIN
  height: 300px;
  // #endif
}
</style>
