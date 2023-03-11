<!-- eslint-disable vue/no-mutating-props -->
<template>
  <view class="edit-list-item flex flex-row m-1 items-center justify-start">
    <text class="font-bold" :class="props.field.required ? 'required' : ''">{{ props.title }}：</text>
    <uni-datetime-picker v-if="props.type == 'date'" v-model="props.item[props.name]" type="date" :clear-icon="false" />
    <uni-easyinput v-else-if="props.type === 'input'" v-model="props.item[props.name]" :type="props.field.inputType" />
    <text v-else>{{ props.item[props.name] }}</text>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
// const store = usePurchaseInStore()
// 奇怪问题 父组件要传value才会联动
const props = defineProps(['title', 'store', 'type', 'item', 'name', 'field'])
</script>

<style lang="scss" scoped>
.edit-list-item {
  .required {
    position: relative;
    padding-left: 5px;
    &:before {
      content: '*';
      position: absolute;
      display: flex;
      align-items: center;
      left: 0px;
      justify-content: center;
      color: #dd524d;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
