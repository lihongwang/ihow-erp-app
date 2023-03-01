<template>
  <view class="charts-box">
    <canvas id="salePurchase" canvas-id="salePurchase" class="chart-canvas" @touchstart="touchColumn"></canvas>
    <image v-if="!isImg" :src="imgSrc" style="width: 100%; height: 500upx"></image>
  </view>
</template>

<script>
import uCharts from './u-charts/u-charts.js'
let _self
let canvasChart
export default {
  data() {
    return {
      cWidth: '', //图表的宽度
      cHeight: '', //图表的高度
      pixelRatio: 0.6, //设备像素比
      imgSrc: '', //图表替换成图片的路径
      isImg: true, //是否替换图片
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {},
    }
  },
  created() {
    _self = this
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750)
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500)
    this.isImg = true
    this.getServerData()
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      setTimeout(() => {
        let res = {
          categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
          series: [
            {
              name: '目标值',
              data: [35, 36, 31, 33, 13, 34],
            },
            {
              name: '完成量',
              data: [18, 27, 21, 24, 6, 28],
            },
          ],
        }
        this.showColumn('salePurchase', res)
      }, 500)
    },
    showColumn(canvasId, chartData) {
      const ctx = uni.createCanvasContext(canvasId, _self)
      canvasChart = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        context: ctx,
        color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
        enableScroll: true,
        animation: true,
        pixelRatio: _self.pixelRatio,
        categories: chartData.categories,
        width: _self.cWidth,
        height: _self.cHeight,
        series: chartData.series,
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          data: [{ min: 0 }],
        },
        extra: {
          column: {
            type: 'group',
          },
        },
      })
      canvasChart.addEventListener('renderComplete', () => {
        //监控图表渲染完成
        setTimeout(function () {
          //延迟一定时间执行
          uni.canvasToTempFilePath(
            {
              //将图表转成图片
              x: 0,
              y: 0,
              width: _self.cWidth * _self.pixelRatio,
              height: _self.cHeight * _self.pixelRatio,
              fileType: 'png',
              canvasId: canvasId,
              success: function (res) {
                _self.isImg = false
                _self.imgSrc = res.tempFilePath
                console.log(_self.imgSrc)
              },
              fail: function () {},
            },
            _self
          )
        }, 1000)
      })
    },
    //点击图表的柱状，弹出详细信息  但是将图表转成图片后这个方法不可用
    touchColumn(e) {
      canvasChart.showToolTip(e, {
        format: function (item, category) {
          if (typeof item.data === 'object') {
            return category + ' ' + '人数' + ':' + item.data.value
          } else {
            return category + ' ' + '人数' + ':' + item.data
          }
        },
      })
    },
  },
}
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 500rpx;
}
.chart-canvas {
  position: absolute;
  width: 100%;
  right: -900px;
  top: -600px;
}
</style>
