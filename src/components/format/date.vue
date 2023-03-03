<template>
  <text>{{ dateValue }}</text>
</template>

<script setup>
import { defineProps } from 'vue'
import dayjs from 'dayjs'
const props = defineProps(['value', 'full', 'format', 'params'])
const format = props.format || props.params?.format
const full = props.full || props.params?.full
const dateValue = dayjs(new Date(props.value)).format(format ? format : full ? 'YYYY-MM-DD:HH:mm:ss' : 'YYYY-MM-DD')
</script>

<style></style>
