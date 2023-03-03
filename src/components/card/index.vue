<template>
  <uni-card class="detail-card">
    <template #title>
      <view class="card-header">
        <view v-if="!$slots.header" class="header-wrapper">
          <view v-if="title" class="card-title">
            {{ props.title }}
          </view>
          <view v-if="subTitle" class="card-sub-title">
            {{ props.subTitle }}
          </view>
        </view>
        <slot v-else name="header"></slot>
      </view>
    </template>
    <view class="card-body"><slot name="body"></slot></view>
    <template #actions>
      <view v-if="!props.noFooter" class="card-footer">
        <slot name="footer"></slot>
      </view>
    </template>
  </uni-card>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps(['title', 'subTitle', 'noFooter'])
console.log(props)
</script>
<style lang="scss">
.card-header {
  border-bottom: 1px solid rgb(226 232 240);
  padding: 10px;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.card-footer {
  padding: 5px;
  border-top: 1px solid #ebeef5;
  :deep(.more-btn) {
    letter-spacing: 2px;
    &:after {
      border: none !important;
    }
  }
}
// #ifdef MP-WEIXIN
.detail-card > view {
  padding: 0 !important;
  margin: 10px !important;
  font-size: 12px;
}
// #endif
.detail-card {
  padding: 0 !important;
  margin: 10px !important;
  font-size: 12px;
}
</style>
