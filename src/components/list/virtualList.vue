<template>
  <scroll-view ref="list" scroll-y="true" class="list-container" style="height: 100vh" @scroll="handleScroll">
    <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="list" :style="{ transform: getTransform }">
      <div
        v-for="item in visibleData"
        :key="item.id"
        class="list-item"
        :style="{ height: props.itemSize + 'px', lineHeight: props.itemSize + 'px' }"
      >
        <SelectItem :item="item" :checked="[]" :properties="props.properties" />
      </div>
    </div>
  </scroll-view>
</template>

<script setup>
import SelectItem from '@/components/list/selectItem'
import { computed, ref, onMounted, defineProps } from 'vue'
const props = defineProps({
  properties: {
    type: Array,
    required: true,
    default: () => [],
  },
  //所有列表数据
  listData: {
    type: Array,
    required: true,
    default: () => [],
  },
  //每项高度
  itemSize: {
    type: Number,
    default: 200,
  },
})
console.log(props)
const data = ref({
  screenHeight: 0, // 屏幕高度即可视区域高度
  startOffset: 0, // 顶部偏移量
  startIndex: 0, // 可视化区域的数据开始下标
  endIndex: 0, // 可视化区域的数据结束下标
})
//列表总高度
const listHeight = computed(() => props.listData.length * props.itemSize)
//可显示的列表项数
data.value.visibleCount = computed(() => Math.ceil(data.value.screenHeight / props.itemSize))
//偏移量对应的style
const getTransform = computed(() => {
  return `translate3d(0,${data.value.startOffset}px,0)`
})
//获取真实显示列表数据
const visibleData = computed(() => {
  return props.listData.slice(data.value.startIndex, Math.min(data.value.endIndex, props.listData.length))
})
onMounted(() => {
  getScreenHeight()
  data.value.startIndex = 0
  data.value.endIndex = data.value.startIndex + data.value.visibleCount
})
// 获取屏幕高度即可视化区域高度
const getScreenHeight = () => {
  uni.getSystemInfo({
    success: function (res) {
      data.value.screenHeight = res.screenHeight
    },
  })
}
const handleScroll = (e) => {
  //当前滚动位置
  let scrollTop = e.detail.scrollTop
  //开始索引
  data.value.startIndex = Math.floor(scrollTop / props.itemSize)
  //结束索引
  data.value.endIndex = data.value.startIndex + data.value.visibleCount
  //顶部偏移量
  data.value.startOffset = scrollTop - (scrollTop % props.itemSize)
}
</script>

<style lang="scss" scoped>
.list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  .list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    .list-item {
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
