<template>
  <uni-drawer ref="drawer" mode="right" :mask-click="false" width="100%">
    <view class="scroll-container">
      <view class="top-placeholder"></view>
      <view class="drawer-content">
        <PaginationList
          ref="listRef"
          class="pagination-list-container"
          :sub-name="subName"
          select-type="checkbox"
          :primary-key="primaryKey"
          :selected-items="selectedItems"
          :list-data="detailData"
          :properties="popupFields"
          @onFetchData="fetchData"
        />
      </view>
      <view class="btn-wrap flex flex-row justify-around">
        <button size="mini" @click="closeDrawer">返回</button>
        <button size="mini" type="primary" @click="handleConfirm">确定</button>
      </view>
    </view>
  </uni-drawer>
</template>

<script setup>
import PaginationList from '@/components/list/paginationList'
import { ref, defineEmits, defineExpose, defineProps } from 'vue'

const props = defineProps(['store'])

const { primaryKey, popupFields, subName } = props.store.getPopupDetailFields()

const detailData = ref()
const drawer = ref()
const listRef = ref()
const selectedItems = ref()
const query = ref({})
const emits = defineEmits(['onConfirm'])
const closeDrawer = () => {
  drawer.value.close()
}
const handleConfirm = () => {
  drawer.value.close()
  const items = listRef.value?.getCheckedItems() || []
  emits('onConfirm', {
    items,
  })
}

const fetchData = (data) => {
  props.store.getPopupDetails({ ...query.value, ...data }).then((res) => {
    detailData.value = res.list
    const { setPageInfo } = listRef?.value || {}
    setPageInfo?.({
      shown: true,
      page: res.page + 1,
      pageSize: res.pageSize,
      total: res.total,
    })
  })
}

defineExpose({
  open: (items, data = {}) => {
    drawer.value.open()
    query.value = data
    selectedItems.value = items
    fetchData({
      page: 0,
    })
  },
})
</script>

<style lang="scss" scoped>
::v-deep .scroll-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-placeholder {
    height: 45px;
    // #ifdef MP-WEIXIN
    height: 90px;
    // #endif
  }
  .btn-wrap {
    height: 30px;
    bottom: 0px;
    background: #fff;
    width: 100%;
    padding: 10px 0px;
  }
  .drawer-content {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  .pagination-list-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
