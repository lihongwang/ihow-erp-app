<template>
  <view class="flex flex-row m-2 items-center justify-start">
    <text class="font-bold">{{ props.title }}：</text>
    <FormatDate v-if="props.type == 'date'" :value="props.value" />
    <FormatEnum v-else-if="props.type == 'enum'" :value="props.value" />
    <FormatPrice v-else-if="props.type == 'price'" :price="props.value" />
    <text v-else-if="props.value">{{ props.value }}</text>
    <slot v-else></slot>
  </view>
</template>

<script setup>
import FormatDate from '@/components/format/date'
import FormatEnum from '@/components/format/enum'
import FormatPrice from '@/components/format/price'
import { defineProps } from 'vue'
const props = defineProps(['title', 'value', 'type'])
</script>

<style></style>
