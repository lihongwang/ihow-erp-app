<template>
  <text>{{ dateValue }}</text>
</template>

<script setup>
import { defineProps } from 'vue'
import dayjs from 'dayjs'
const props = defineProps(['value', 'full', 'format'])
console.log(props)
const dateValue = dayjs(new Date(props.value)).format(
  props.format ? props.format : props.full ? 'YYYY-MM-DD:HH:mm:ss' : 'YYYY-MM-DD'
)
</script>

<style></style>
