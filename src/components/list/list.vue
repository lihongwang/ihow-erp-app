<template>
  <scroll-view scroll-y="true" style="height: {{height+'px'}}" @scrolltolower="onReachScrollBottom">
    <slot name="content"></slot>
    <uni-load-more v-if="data.shown" :status="data.status" :content-text="data.contentText" @click="loadMore" />
  </scroll-view>
</template>

<script setup>
import { ref, defineEmits, defineExpose } from 'vue'
const myEmit = defineEmits(['onFetchData'])
const data = ref({
  status: 'more',
  shown: false,
  contentText: {
    contentdown: '查看更多',
    contentrefresh: '加载中',
    contentnomore: '没有更多',
  },
  page: 0,
  pageSize: 10,
  total: 0,
})
const getPageInfo = () => {
  return data.value
}
const setPageInfo = (val = {}) => {
  console.log('setPageInfo')
  data.value = {
    ...data.value,
    ...val,
    shown: true,
    status: val.page < Math.ceil(val.total / val.pageSize) ? 'more' : 'no-more',
  }
  console.log(data.value)
}

defineExpose({
  getPageInfo,
  setPageInfo,
})
const loadMore = () => {
  data.value.status = 'loading'
  myEmit(
    'onFetchData',
    {
      page: data.value.page + 1,
      pageSize: data.value.pageSize,
    },
    true
  )
}

// // 滚动到底部触发事件
// const onReachScrollBottom = () => {
//   const val = data.value
//   console.log(val)
//   if (val.flag && val.list.page != val.total) {
//     myEmit('onFetchData', {})
//   }
//   if (val.list.page == val.total) {
//     uni.showLoading({
//       title: '数据加载完毕',
//     })
//     setTimeout(function () {
//       uni.hideLoading()
//     }, 1000)
//   }
// }
</script>

<style></style>
