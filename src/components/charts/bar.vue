<template>
  <view>
    <view>销售统计</view>
    <view class="data">
      <view class="statistics">
        <view class="qiun-charts">
          <canvas id="canvasColumn" canvas-id="canvasColumn" class="charts checked" @touchstart="touchColumn"></canvas>
          <image v-if="!isImg" :src="imgSrc" style="width: 100%; height: 240px"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uCharts from './u-charts/u-charts.js'
let _self
let canvaColumn = null
export default {
  data() {
    return {
      pullDown: false, //是否展开下拉框
      cWidth: '', //图表的宽度
      cHeight: '', //图表的高度
      pixelRatio: 1, //设备像素比
      imgSrc: '', //图表替换成图片的路径
      isImg: true, //是否替换图片
      statistics: [
        { data: 1, title: '业务员' },
        { data: 3, title: 'B端用户' },
        { data: 4, title: '零售用户' },
        { data: 0, title: '未成交客户' },
      ],
    }
  },
  created() {
    console.log('onload')
    _self = this
    this.cWidth = uni.upx2px(630)
    this.cHeight = uni.upx2px(440)
    this.getMchInfo(0)
  },
  methods: {
    //请求后台数据
    getMchInfo(id) {
      this.isImg = true
      this.getServerData(this.statistics)
    },
    //将请求到的数据处理一遍
    getServerData(data) {
      let Column = {
        categories: ['业务员', 'b端用户', '零售用户', '未成交客户'],
        series: [
          {
            name: '今日统计分析',
            data: [
              {
                value: 2,
                color: '#6272FE',
              },
              {
                value: 1,
                color: '#FF4686',
              },
              {
                value: 5,
                color: '#FDA75B',
              },
              {
                value: 4,
                color: '#16D4A8',
              },
            ],
          },
        ],
      }
      this.showColumn('canvasColumn', Column)
    },
    //将请求到的数据赋值给图表
    showColumn(canvasId, chartData) {
      const ctx = uni.createCanvasContext(canvasId, _self)
      canvaColumn = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        context: ctx,
        legend: {
          show: true,
          position: 'top',
          float: 'left',
        },
        fontSize: 11,
        pixelRatio: _self.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          format: (val) => {
            return val.toFixed(0)
          },
          //disabled:true
        },
        dataLabel: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          column: {
            type: 'group',
            width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length,
          },
        },
      })
      canvaColumn.addEventListener('renderComplete', () => {
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
              },
              fail: function (res) {},
            },
            _self
          )
        }, 1000)
      })
    },
    //点击图表的柱状，弹出详细信息  但是将图表转成图片后这个方法不可用
    touchColumn(e) {
      canvaColumn.showToolTip(e, {
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

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.qiun-charts {
  width: 630upx;
  height: 440rpx;
}

.charts {
  width: 100%;
  height: 100%;
}

.checked {
  position: absolute;
  width: 100%;
  right: -900px;
  top: -600px;
}
</style>
