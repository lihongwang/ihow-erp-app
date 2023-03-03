<template>
  <view class="timelineItem">
    <view class="timeItem">
      <view class="time">
        {{ props.time }}
      </view>
      <view class="line">
        <view class="out" :class="props.type" :style="{ background: props.color == '' ? '' : props.color }">
          <view class="inner" :style="{ background: props.color == '' ? '' : props.color }"></view>
        </view>
      </view>
      <view class="rightContent">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['time', 'color', 'type'])
</script>

<style scoped lang="scss">
.timelineItem {
  .timeItem {
    display: flex;
    .time {
      width: 300rpx;
      padding: 0 10rpx;
      font-size: 22rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-right: 10rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .line {
      width: 1px;
      background: rgba(204, 204, 204, 1);
      position: relative;
      .out {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28rpx;
        height: 28rpx;
        background: rgba(236, 104, 23, 0.6);
        border-radius: 50%;
        .inner {
          width: 10rpx;
          height: 10rpx;
          background: #fff;
          border-radius: 50%;
          margin-bottom: 0.8px;
        }
        &.success {
          background: #18bc37;
        }
        &.info {
          background: #8f939c;
        }
      }
    }
    .rightContent {
      flex: 1;
      padding: 0 10rpx 40rpx;
      margin-left: 20rpx;
      min-height: 50rpx;
    }
  }
}
</style>
