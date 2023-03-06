<template>
  <uni-drawer ref="drawer" mode="right" :mask-click="false" width="100%">
    <scroll-view style="height: 100%; padding: 50px 0" scroll-y="true">
      <view class="btn-wrap flex flex-row justify-around">
        <button size="mini" @click="closeDrawer">返回</button>
        <button size="mini" type="primary" @click="handleConfirm">确定</button>
      </view>
      <view class="drawer-content">
        <PaginationList
          ref="listRef"
          sub-name="name"
          select-type="radio"
          :selected-items="selectedItems"
          :list-data="detailData"
          :properties="itemInfoArrayForList"
          @onCheck="handleRadioCheck"
          @onFetchData="fetchData"
        />
      </view>
    </scroll-view>
  </uni-drawer>
</template>

<script setup>
import PaginationList from '@/components/list/paginationList'
import { itemInfoArrayForList } from '@/store/properties/relatedParty'
import { useRelatedPartyStore } from '@/store/modules/relatedParty'
import { ref, defineEmits, defineExpose } from 'vue'
const store = useRelatedPartyStore()
const detailData = ref()
const drawer = ref()
const listRef = ref()
const selectedItems = ref([])
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

const handleRadioCheck = (item) => {
  selectedItems.value = [item]
}

const fetchData = (data) => {
  store.init(data).then((res) => {
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
  open: (items) => {
    drawer.value.open()
    selectedItems.value = items
    fetchData({
      page: 0,
    })
  },
})
</script>

<style lang="scss" scoped>
.btn-wrap {
  position: fixed;
  bottom: 0px;
  background: #fff;
  z-index: 1000;
  width: 100%;
  padding: 10px 0px;
}
::v-deep .page-wrap {
  box-sizing: border-box;
  position: fixed;
  bottom: 50px;
  background: #fff;
  z-index: 1000;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
}
.drawer-content {
  padding-bottom: 110px;
}
</style>
