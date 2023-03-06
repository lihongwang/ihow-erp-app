<template>
  <view>
    <DetailCard :no-footer="true">
      <template #header>
        <view class="flex flex-row justify-between items-center">
          <view class="card-title">
            <Checkbox
              v-if="props.selectType == 'checkbox'"
              class="item-checkbox"
              :checked="props.checked"
              @onToggle="toggleCheck('checkbox')"
            />
            <Radio
              v-else-if="props.selectType == 'radio'"
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
          <CardListItem
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
import { defineProps, defineEmits } from 'vue'
import DetailCard from '@/components/card/detailCard'
import CardListItem from '@/components/card/listItem'
import Checkbox from '@/components/form/checkbox'
import Radio from '@/components/form/radio'
const props = defineProps(['item', 'properties', 'checked', 'selectType', 'subTitle'])
const emits = defineEmits(['onToggle'])
const toggleCheck = (type) => {
  emits('onToggle', type)
}
</script>

<style lang="scss" scoped>
::v-deep .item-checkbox {
  margin-left: 10px;
}
</style>
