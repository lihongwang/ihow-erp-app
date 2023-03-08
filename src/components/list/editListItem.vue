<!-- eslint-disable vue/no-mutating-props -->
<template>
  <view class="flex flex-row m-1 items-center justify-start">
    <text class="font-bold">{{ props.title }}：</text>
    <uni-datetime-picker v-if="props.type == 'date'" v-model="props.item[props.name]" type="date" :clear-icon="false" />
    <uni-easyinput v-else-if="props.type === 'input'" v-model="props.item[props.name]" />
    <text v-else>{{ props.item[props.name] }}</text>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
// const store = usePurchaseInStore()
// 奇怪问题 父组件要传value才会联动
const props = defineProps(['title', 'store', 'type', 'item', 'name'])
</script>

<style></style>
