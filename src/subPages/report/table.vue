<template>
  <view style="height: calc(100vh - 320px)">
    <zbTable
      :columns="props.columns"
      :show-header="true"
      :stripe="true"
      :border="true"
      row-key="id"
      :data="props.data"
      :show-summary="true"
      :highlight="true"
    ></zbTable>
  </view>
</template>

<script setup>
import zbTable from '@/components/zb-table/zb-table'
import { defineProps } from 'vue'
const props = defineProps(['columns', 'data'])
</script>

<style></style>
