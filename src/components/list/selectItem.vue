<template>
  <view>
    <DetailCard :no-footer="true" @click="handleCheck">
      <template #header>
        <view class="flex flex-row justify-between items-center">
          <view class="card-title">
            <Checkbox
              v-if="props.selectType == 'checkbox'"
              ref="actionRef"
              class="item-checkbox"
              :checked="props.checked"
              :disabled="props.disabled"
              @onToggle="toggleCheck('checkbox')"
            />
            <Radio
              v-else-if="props.selectType == 'radio'"
              ref="actionRef"
              class="item-radio"
              :checked="props.checked"
              @onToggle="toggleCheck('radio')"
            />
            <view v-else>{{ title }}</view>
          </view>
          <view class="card-sub-title">
            {{ props.subTitle }}
          </view>
        </view>
      </template>
      <template #body>
        <view class="flex flex-col">
          <ListItem
            v-for="info in props.properties"
            :key="info.name"
            :title="info.title"
            :value="props.item[info.name] || props.item[info.aliasName]"
            :type="info.type"
            :params="info.params || {}"
          />
        </view>
      </template>
    </DetailCard>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import DetailCard from '@/components/card/detailCard'
import ListItem from '@/components/list/listItem'
import Checkbox from '@/components/form/checkbox'
import Radio from '@/components/form/radio'
const actionRef = ref()
const props = defineProps(['item', 'properties', 'checked', 'disabled', 'selectType', 'subTitle'])
const emits = defineEmits(['onToggle'])
const toggleCheck = (type) => {
  emits('onToggle', type)
}
const handleCheck = () => {
  actionRef.value.toggleCheck()
}
</script>

<style lang="scss" scoped>
::v-deep .item-checkbox {
  margin-left: 10px;
}
</style>
