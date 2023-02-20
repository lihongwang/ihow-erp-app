<template>
  <cover-view class="tabbar" :style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }">
    <cover-view v-for="(item, index) in list" :key="index" class="tabbar-item" @click="tabbarChange(item.path)">
      <!-- <cover-image v-if="current == index" class="item-img" :src="item.icon_a"></cover-image>
      <cover-image v-else class="item-img" :src="item.icon"></cover-image> -->
      <uni-icons v-if="current == index" type="contact" class="item-img active" size="24"></uni-icons>
      <uni-icons v-else type="contact" class="item-img" size="24"></uni-icons>
      <cover-view v-if="item.text" class="item-name" :class="{ tabbarActive: current == index }">{{
        item.text
      }}</cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  props: {
    current: String,
  },
  data() {
    return {
      paddingBottomHeight: 0, //苹果X以上手机底部适配高度
      list: [
        {
          text: '首页',
          icon: 'home', //未选中图标
          icon_a: '/static/images/home_i.png', //选中图片
          path: '/pages/home/index', //页面路径
        },
        {
          text: 'Demo',
          icon: 'heart',
          icon_a: '/static/images/classify_i.png',
          path: '/pages/demo/index',
        },
        {
          text: 'Form',
          icon: 'flag   ',
          icon_a: '/static/images/order_i.png',
          path: '/pages/form/index',
        },
        {
          text: 'Test',
          icon: 'person',
          icon_a: '/static/images/me_i.png',
          path: '/pages/test/index',
        },
      ],
    }
  },
  watch: {},
  created() {
    let that = this
    uni.getSystemInfo({
      success: function (res) {
        let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15']
        model.forEach((item) => {
          //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
          if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
            that.paddingBottomHeight = 40
          }
        })
      },
    })
  },
  methods: {
    tabbarChange(path) {
      uni.switchTab({
        url: path,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tabbarActive {
  color: #79d5ad !important;
}
.item-img.active {
  color: #79d5ad !important;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100rpx;
  background-color: #ffffff;
  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100rpx;
    .item-img {
      margin-bottom: 4rpx;
      width: 46rpx;
      height: 46rpx;
    }
    .item-name {
      font-size: 26rpx;
      color: #a3a3a3;
    }
  }
}
</style>
