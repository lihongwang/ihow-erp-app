<template>
  <view class="flex flex-row m-1 items-center justify-start">
    <text class="font-bold">{{ props.title }}：</text>
    <FormatDate v-if="props.type == 'date' && props.value" :value="props.value" :params="props.params" />
    <FormatEnum v-else-if="props.type == 'enum'" :value="props.value" :params="props.params" />
    <FormatPrice v-else-if="props.type == 'price'" :price="props.value" :params="props.params" />
    <text v-else-if="props.value">{{ props.value }}</text>
    <slot v-else></slot>
  </view>
</template>

<script setup>
import FormatDate from '@/components/format/date'
import FormatEnum from '@/components/format/enum'
import FormatPrice from '@/components/format/price'
import { defineProps } from 'vue'
const props = defineProps(['title', 'value', 'type', 'params'])
</script>

<style></style>
