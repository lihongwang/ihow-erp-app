<template>
  <view class="search-tags">
    <view class="tags-value">
      <text v-for="item in props.keys" :key="item" :title="getContent(item)" class="tag-item">
        {{ getContent(item) }}
      </text>
    </view>

    <uni-tag text="清空" type="primary" class="action" @click="handleEmpty" />
  </view>
</template>

<script setup>
import { arrayToObject } from '@/utils/data'
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['searchFields', 'searchModel', 'keys'])
const emits = defineEmits(['emptySearch'])
const searchFieldsObj = arrayToObject(props.searchFields, 'name')
const handleEmpty = () => {
  emits('emptySearch')
}
const getContent = (item) => {
  return `${searchFieldsObj[item]?.title}: ${props.searchModel[item]}`
}
</script>

<style lang="scss" scoped>
.search-tags {
  display: flex;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
  .tag-item {
    margin: 5px;
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  .action {
    width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tags-value {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .tag-item {
    // line-height: 14px;
    font-size: 12px;
    font-weight: 200;
    padding: 4px 7px;
    color: #fff;
    border-radius: 3px;
    background-color: #8f939c;
    border-width: 1px;
    border-style: solid;
    border-color: #8f939c;
    cursor: pointer;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
