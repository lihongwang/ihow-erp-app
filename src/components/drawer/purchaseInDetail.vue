<template>
  <uni-drawer ref="drawer" mode="right" :mask-click="false" width="100%">
    <view class="scroll-container">
      <view class="btn-wrap flex flex-row justify-around">
        <button size="mini" @click="closeDrawer">返回</button>
        <button size="mini" type="primary" @click="handleConfirm">确定</button>
      </view>
      <view class="drawer-content">
        <PaginationList
          ref="listRef"
          sub-name="goodsName"
          select-type="checkbox"
          :selected-items="selectedItems"
          :list-data="detailData"
          :properties="selectItemArrayForList"
          @onFetchData="fetchData"
        />
      </view>
    </view>
  </uni-drawer>
</template>

<script setup>
import PaginationList from '@/components/list/paginationList'
import { selectItemArrayForList } from '@/store/properties/purchaseIn'
import { usePurchaseInStore } from '@/store/modules/purchaseIn'
import { ref, defineEmits, defineExpose } from 'vue'

const store = usePurchaseInStore()
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
  store.getDetails({ ...query.value, ...data }).then((res) => {
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
  padding: 50px 0;
  // #ifdef MP-WEIXIN
  padding: 70px 0;
  // #endif
  .btn-wrap {
    position: fixed;
    bottom: 0px;
    background: #fff;
    z-index: 1000;
    width: 100%;
    padding: 10px 0px;
  }

  .drawer-content {
    padding-bottom: 110px;
  }
}
</style>
