<template>
  <view class="pagination-list">
    <view class="list">
      <view v-for="item in listData" :key="item[props.primaryKey]" class="list-item">
        <SelectItem
          :select-type="props.selectType"
          :item="item"
          :radio-selected-item="radioSelectedItem"
          :sub-title="item[props.subName]"
          :checked="isChecked(item[props.primaryKey])"
          :properties="props.properties"
          @onToggle="toggleCheck(item)"
        />
      </view>
    </view>
    <view class="pagination-action-wrap">
      <uni-pagination
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current="pagination.current"
        title="标题文字"
        @change="handlePagination"
      />
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineExpose, defineEmits, ref } from 'vue'
import SelectItem from '@/components/list/selectItem'
const emits = defineEmits(['onFetchData', 'onCheck'])
const props = defineProps({
  // 副标题内容key
  subName: {
    type: String,
    default: 'name',
  },
  // 备选项主key
  primaryKey: {
    type: String,
    default: 'id',
  },
  // 备选类型：checkbox、radio或者没有
  selectType: {
    type: String,
    default: '',
  },
  // 显示的item 属性字段
  properties: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 已选择的数据
  selectedItems: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 所有列表数据
  listData: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const radioSelectedItem = ref(props.selectedItems)
const checked = ref([])

const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
})
const getPageInfo = () => {
  return pagination.value
}
const setPageInfo = (val = {}) => {
  pagination.value = {
    ...pagination.value,
    ...val,
  }
}
defineExpose({
  getPageInfo,
  setPageInfo,
  getCheckedItems: () => {
    return [...checked.value]
  },
})
const isChecked = (key) => {
  if (props.selectType === 'checkbox') {
    return !!props.selectedItems.find((c) => c[props.primaryKey] == key)
  } else if (props.selectType === 'radio') {
    return !!radioSelectedItem.value.find((c) => c[props.primaryKey] == key)
  }
}
const isNewChecked = (key) => {
  return !!checked.value.find((c) => c[props.primaryKey] == key)
}
const toggleCheck = (item) => {
  const key = props.primaryKey
  if (props.selectType === 'checkbox') {
    if (isNewChecked(item[key])) {
      checked.value = checked.value.filter((c) => c[key] != item[key])
    } else {
      checked.value = [...checked.value, item]
    }
  } else if (props.selectType === 'radio') {
    checked.value = [item]
    radioSelectedItem.value = [item]
  }
}
const handlePagination = ({ current }) => {
  emits('onFetchData', { page: current - 1 })
}
</script>

<style lang="scss" scoped>
.pagination-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
    min-height: 0;
    flex-shrink: 0;
    overflow-y: auto !important;
  }
  .pagination-action-wrap {
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #d9d9d9;
    border-top: 1px solid #d9d9d9;
  }
}
</style>
