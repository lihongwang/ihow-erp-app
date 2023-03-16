<template>
  <view class="drawer-input w-full flex flex-row justify-between">
    <uni-easyinput disabled :value="relatedParty?.name || props.value" placeholder="请选择"></uni-easyinput>
    <button type="primary" size="mini" class="choose-btn" @click="handleClick">选择</button>
    <RPDrawer ref="relatedPartyDrawerRef" @onConfirm="handleRelatedPartyConfirm" />
  </view>
</template>

<script setup>
import RPDrawer from '@/components/drawer/customer'
import { ref, defineEmits, defineProps } from 'vue'
const props = defineProps(['value', 'item'])
const emits = defineEmits(['onSelect'])
const relatedPartyDrawerRef = ref()
const relatedParty = ref(null)
const handleRelatedPartyConfirm = ({ items }) => {
  relatedParty.value = items[0]
  emits('onSelect', items[0])
}
const getSelectedItems = () => {
  return relatedParty.value
    ? [relatedParty.value]
    : [
        {
          id: props.item?.customerId || props.item?.relatedPartyId,
          name: props.item?.customerName || props.item?.relatedPartyName,
        },
      ]
}
const handleClick = () => {
  relatedPartyDrawerRef.value.open(getSelectedItems())
}
</script>

<style lang="scss" scoped>
.drawer-input {
}
</style>
