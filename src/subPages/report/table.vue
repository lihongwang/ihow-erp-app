<template>
  <view style="height: 100%">
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
const props = defineProps(['columns', 'data', 'formatter'])
</script>

<style></style>
