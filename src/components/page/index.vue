<template>
  <view class="page" :style="{ backgroundColor: color }">
    <view class="card">
      {{ text }}
    </view>
    <!-- 底部占位，防止页面滚动到底部时，出现被tabbar遮挡的问题 -->
    <view class="cu-tabbar-height"></view>
  </view>
</template>

<script>
export default {
  props: ['text', 'color'],
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.page,
.card {
  width: 100%;
  height: 100%;
}
.card {
  font-size: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 底部tabbar占位css
.cu-tabbar-height {
  min-height: 100rpx;
  height: calc(100rpx + env(safe-area-inset-bottom) / 2);
}
</style>
