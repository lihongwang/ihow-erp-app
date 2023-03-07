<template>
  <scroll-view scroll-y="true" :class="props.class" class="scroll-list" @scrolltolower="onReachScrollBottom">
    <slot name="content"></slot>
    <view @click="loadMore">
      <uni-load-more v-if="data.shown" class="load-more" :status="data.status" :content-text="data.contentText" />
    </view>
  </scroll-view>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
const props = defineProps(['class'])
const emits = defineEmits(['onFetchData'])
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
}

defineExpose({
  getPageInfo,
  setPageInfo,
})
const loadMore = () => {
  console.log('loadMore')
  if (data.value.status === 'no-more') return
  data.value.status = 'loading'

  emits(
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
//     emits('onFetchData', {})
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

<style lang="scss" scoped>
.scroll-list {
  padding-bottom: 20px;
}
</style>
