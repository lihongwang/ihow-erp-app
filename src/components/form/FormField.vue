<!-- eslint-disable vue/no-mutating-props -->
<template>
  <view class="flex flex-row m-1 items-center justify-start">
    <uni-datetime-picker
      v-if="props.type === 'date'"
      v-model="props.item[props.name]"
      type="date"
      :clear-icon="false"
    />
    <RelatedPartyItem
      v-else-if="props.type === 'relatedParty'"
      :value="props.item[props.name]"
      :item="props.item"
      @onSelect="props.fieldContext.handleSelectRelatedParty"
    />
    <Suppliertem
      v-else-if="props.type === 'supplier'"
      :value="props.item[props.name]"
      :item="props.item"
      @onSelect="props.fieldContext.handleSelectRelatedParty"
    />
    <CustomerItem
      v-else-if="props.type === 'customer'"
      :value="props.item[props.name]"
      :item="props.item"
      @onSelect="props.fieldContext.handleSelectRelatedParty"
    />
    <uni-data-select
      v-else-if="props.type == 'warehouse'"
      v-model="props.item[props.name]"
      :localdata="props.fieldContext.warehouseList"
    ></uni-data-select>
    <uni-easyinput v-else v-model="props.item[props.name]" :type="props.field.inputType" />
  </view>
</template>

<script setup>
import RelatedPartyItem from '@/components/form/relatedParty'
import Suppliertem from '@/components/form/supplier'
import CustomerItem from '@/components/form/customer'
import { defineProps } from 'vue'
const props = defineProps(['field', 'type', 'name', 'item', 'fieldContext'])
</script>

<style></style>
