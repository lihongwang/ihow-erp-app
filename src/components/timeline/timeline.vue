<template>
  <view class="timeline">
    <TimelineItem
      v-for="(timeItem, index) in props.data"
      :key="index"
      :type="props.map[timeItem.dataEventTypeEnum?.name]"
      :time="formatTime(timeItem.recordTime)"
    >
      <view class="item-wrap">
        <view class="username">{{ timeItem.userName }}</view>
        <view class="content" :class="props.map[timeItem.dataEventTypeEnum?.name]">{{
          timeItem.dataEventTypeEnum?.name
        }}</view>
      </view>
    </TimelineItem>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
import TimelineItem from './timelineItem.vue'
import dayjs from 'dayjs'
const props = defineProps(['data', 'map'])
const formatTime = (date) => {
  return dayjs(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style scoped lang="scss">
.timeline {
  box-sizing: border-box;
  padding: 35rpx;
  .item-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .username {
      font-size: 28rpx;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .content {
      font-size: 22rpx;
      font-weight: 400;
      color: #8f939c;
      margin-left: 20rpx;
      &.success {
        color: #18bc37;
      }
    }
  }
}
</style>
