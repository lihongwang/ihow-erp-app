<template>
  <view :style="props.style">
    <zbTable
      :columns="props.columns"
      :show-header="true"
      :stripe="true"
      :border="true"
      row-key="id"
      :data="props.data"
      :formatter="props.formatter"
      :highlight="true"
    ></zbTable>
  </view>
</template>

<script setup>
import zbTable from '@/components/zb-table/zb-table'
import { defineProps } from 'vue'
const props = defineProps(['columns', 'data', 'formatter', 'style'])
</script>

<style></style>
