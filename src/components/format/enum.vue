<template>
  <view>
    <text>{{ enumValue }}</text>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['value'])
const enumValue = props.value?.name || props.value || ''
</script>

<style></style>
