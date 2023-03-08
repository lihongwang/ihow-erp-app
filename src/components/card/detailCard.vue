<template>
  <uni-card class="detail-card">
    <template #title>
      <view v-if="!props.noHeader" class="card-header">
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
const props = defineProps(['title', 'subTitle', 'noHeader', 'noFooter'])
</script>
<style lang="scss"></style>
