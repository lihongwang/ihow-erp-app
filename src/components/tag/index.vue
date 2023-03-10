<template>
  <uni-tag :text="props.name" :type="statusList[props.name]"></uni-tag>
</template>

<script setup>
import { defineProps } from 'vue'
import { statusList } from '@/utils/status'
const props = defineProps(['name'])
console.log(props.name)
console.log(statusList[props.name])
</script>

<style></style>
