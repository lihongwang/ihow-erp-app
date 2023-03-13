<template>
  <view class="info-text">
    <view class="title">{{ props.title }}</view>
    <view class="info">
      <h3 class="num">
        {{ props.info }}
        <span v-if="props.money || props.extra" class="extra">{{ props.extra || '元' }}</span>
      </h3>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['title', 'info', 'money', 'extra'])
</script>

<style lang="scss" scoped>
.info-text {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  .title {
    font-size: 12px;
    font-weight: 500;
    color: #97979b;
  }
  .info {
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
    min-height: 20px;
    .extra {
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
