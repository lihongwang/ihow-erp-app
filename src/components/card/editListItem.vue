<template>
  <view class="flex flex-row m-1 items-center justify-start">
    <text class="font-bold">{{ props.title }}：</text>
    <uni-datetime-picker
      v-if="props.params?.editable && props.type == 'date'"
      :v-model="props.model[props.name]"
      type="date"
      :clear-icon="false"
    />
    <uni-easyinput v-else-if="props.params?.editable" :v-model="props.model[props.name]" class="list-val" />
    <FormatDate v-else-if="props.type == 'date'" :value="props.value" :params="props.params" />
    <text v-else>{{ props.value }}</text>
  </view>
</template>

<script setup>
// import { usePurchaseInStore } from '@/store/modules/purchaseIn'
import FormatDate from '@/components/format/date'
import { defineProps } from 'vue'
// const store = usePurchaseInStore()
const props = defineProps(['title', 'model', 'type', 'params', 'name', 'value'])
</script>

<style></style>
