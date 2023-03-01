<template>
  <view class="container">
    <view class="body">
      <view class="tenant_title">
        <view class="title" @click="pullDown = !pullDown">
          <text>{{ mch }}</text>
          <text v-if="!pullDown" class="iconfont icon-xia"></text>
          <text v-else class="iconfont icon-weibiaoti33"></text>
        </view>
        <radio-group v-if="pullDown" @change="radioChange">
          <label v-for="(item, index) in mchList" :key="index">
            <view class="radioItem" :class="item.checked === 1 ? 'bjColor' : ''">
              <radio :value="item.name" :checked="item.checked === 1" />
              <text>{{ item.name }}</text>
            </view>
          </label>
        </radio-group>
      </view>
      <view class="data">
        <view class="statistics">
          <view class="qiun-charts">
            <canvas
              id="canvasColumn"
              canvas-id="canvasColumn"
              class="charts"
              :class="isImg ? '' : 'checked'"
              @touchstart="touchColumn"
            ></canvas>
            <image v-if="!isImg" :src="imgSrc" style="width: 100%; height: 100%"></image>
          </view>
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
      mch: '', //设置选中的商户名称
      imgSrc: '', //图表替换成图片的路径
      isImg: true, //是否替换图片
      statistics: [
        { data: 1, title: '业务员' },
        { data: 3, title: 'B端用户' },
        { data: 4, title: '零售用户' },
        { data: 0, title: '未成交客户' },
      ],
      mchList: [
        { checked: 1, id: '001', name: 'X菲家居' },
        { checked: 0, id: '002', name: 'X茵斯顿' },
        { checked: 0, id: '003', name: 'X港旗舰店' },
        { checked: 0, id: '004', name: '测试店铺2' },
      ],
    }
  },
  created() {
    console.log('onload')
    _self = this
    //#ifdef MP-ALIPAY
    uni.getSystemInfo({
      success: function (res) {
        if (res.pixelRatio > 1) {
          //正常这里给2就行，如果pixelRatio=3性能会降低一点
          //_self.pixelRatio =res.pixelRatio;
          _self.pixelRatio = 2
        }
      },
    })
    //#endif
    this.cWidth = uni.upx2px(630)
    this.cHeight = uni.upx2px(440)
    this.getMchInfo(0)
  },
  methods: {
    //请求后台数据
    getMchInfo(id) {
      /* uni.request({
					header: {},
					url: '',
					method: '',
					data: {
						mch_id: id?id:''
					},
					success: (res) => {
						if (res.statusCode == 200) {
							uni.hideLoading()
							this.isImg = true
							this.statistics = res.count_List
							this.mchList = res.mch_list
							this.getServerData(this.statistics)
						}
					}
				}) */

      uni.hideLoading()
      this.isImg = true
      this.getServerData(this.statistics)
      this.mchList.forEach((item, index) => {
        if (item.checked === 1) {
          this.mch = item.name //设置默认值
        }
      })
    },
    //将请求到的数据处理一遍
    getServerData(data) {
      /* let Column = {
					categories: [],
					series: [{
						name: "今日统计分析",
						data: []
					}]
				}
				for (var i = 0; i < data.length; i++) {
					Column.categories.push(data[i].title)
					if (i == 0) {
						Column.series[0].data[0] = {
							"value": data[i].data,
							"color": "#6272FE"
						}
					} else if (i == 1) {
						Column.series[0].data[1] = {
							"value": data[i].data,
							"color": "#FF4686"
						}
					} else if (i == 2) {
						Column.series[0].data[2] = {
							"value": data[i].data,
							"color": "#FDA75B"
						}
					} else if (i == 3) {
						Column.series[0].data[3] = {
							"value": data[i].data,
							"color": "#16D4A8"
						}
					}
				} */
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
    //点击切换商户
    radioChange(evt) {
      uni.showLoading({})
      var list = this.mchList
      var id = 0
      for (let i = 0; i < list.length; i++) {
        if (list[i].name === evt.detail.value) {
          id = list[i].id
          this.mch = list[i].name
          this.$set(list[i], 'checked', 1)
        } else {
          this.$set(list[i], 'checked', 0)
        }
      }
      this.pullDown = !this.pullDown
      this.getMchInfo(id) //拿到id后调用接口查询后台数据刷新数据源
    },
  },
}
</script>

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
page {
  background-color: #f8f8f8;
}

.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

radio .wx-radio-input {
  height: 36rpx;
  width: 36rpx;
  background: transparent;
  border: 1rpx solid #ccc;
  border-radius: 0;
}

/* 选中后的 背景样式 */
radio .wx-radio-input.wx-radio-input-checked {
  border: none;
  background: transparent;
}

/* 选中后的 对勾样式 */
radio .wx-radio-input.wx-radio-input-checked:before {
  width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  color: #fff;
  background: #ff470b;
  border: 8rpx solid #ff470b;
}

.body {
  border: 1px solid #f8f8f8;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0rpx 30rpx;
  position: relative;
  margin-bottom: 50rpx;

  .tenant_title {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    width: 400rpx;
    height: auto;
    background: #ffffff;
    box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(0, 0, 0, 0.07);
    border-radius: 20rpx;
    padding-bottom: 5rpx;
    overflow: hidden;
    .title {
      width: 100%;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        margin: 8rpx 0rpx 0rpx 16rpx;
        color: #cccccc;
      }
    }

    .bjColor {
      background-color: #f8f8f8;
    }

    .radioItem {
      padding-left: 60rpx;
      width: 100%;
      height: 80rpx;
      display: flex;
      align-items: center;
      text {
        margin-left: 16rpx;
      }
    }
  }

  .data {
    z-index: 88;
    position: relative;
    margin-top: 40rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .statistics {
      width: 100%;
      height: 500rpx;
      padding: 0rpx 30rpx;
      padding-top: 60rpx;

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
    }
  }
}
</style>
