<template>
  <view class="tab-content">
    <view class="grid5 filter-items">
      <view class="tab-item" @click="selectFilter('all')">
        <button :type="filter === 'all' ? 'primary' : 'default'" size="mini" class="tab-item-text">全部</button>
      </view>
      <view class="tab-item" @click="selectFilter('today')">
        <button :type="filter === 'today' ? 'primary' : 'default'" size="mini" class="tab-item-text">今天</button>
      </view>
      <view class="tab-item" @click="selectFilter('week')">
        <button :type="filter === 'week' ? 'primary' : 'default'" size="mini" class="tab-item-text">本周</button>
      </view>
      <view class="tab-item" @click="selectFilter('month')">
        <button :type="filter === 'month' ? 'primary' : 'default'" size="mini" class="tab-item-text">本月</button>
      </view>
      <view class="tab-item" @click="selectFilter('year')">
        <button :type="filter === 'year' ? 'primary' : 'default'" size="mini" class="tab-item-text">本年</button>
      </view>
    </view>
    <view v-if="props.hasStatus" class="grid4 status-items">
      <view class="tab-item" @click="selectStatus(1)">
        <button :type="status === 1 ? 'primary' : 'default'" size="mini" class="tab-item-text">未审核</button>
      </view>
      <view class="tab-item" @click="selectStatus(4)">
        <button :type="status === 4 ? 'primary' : 'default'" size="mini" class="tab-item-text">已审核</button>
      </view>
    </view>
    <view v-if="props.hasProcessStatus" class="grid4 process-items">
      <view class="tab-item" @click="selectProcessStatus(1)">
        <button :type="processStatus === 1 ? 'primary' : 'default'" size="mini" class="tab-item-text">未完成</button>
      </view>
      <view class="tab-item" @click="selectProcessStatus(4)">
        <button :type="processStatus === 4 ? 'primary' : 'default'" size="mini" class="tab-item-text">已完成</button>
      </view>
      <view class="tab-item" @click="selectProcessStatus(8)">
        <button :type="processStatus === 8 ? 'primary' : 'default'" size="mini" class="tab-item-text">已关闭</button>
      </view>
    </view>
  </view>
</template>
<script setup>
import dayjs from 'dayjs'
import { ref, defineEmits, defineProps } from 'vue'
const props = defineProps(['hasProcessStatus', 'hasStatus'])
const filter = ref('all')
const status = ref(0)
const processStatus = ref(0)
const myEmit = defineEmits(['onFetchData'])
const selectFilter = (type) => {
  filter.value = type
  let opts = {}
  if (status.value) opts.auditStatusEnum = status.value
  if (processStatus.value) opts.processStatusEnum = processStatus.value
  if (type === 'all') {
    processStatus.value = 0
    status.value = 0
  } else {
    switch (type) {
      case 'today':
        const startOfDay = dayjs(new Date()).format('YYYY-MM-DD hh:mm')
        opts = {
          ...opts,
          fromBillDate: startOfDay,
          toBillDate: startOfDay,
        }
        break
      case 'week':
        const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD hh:mm')
        const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD hh:mm')
        opts = {
          ...opts,
          fromBillDate: startOfWeek,
          toBillDate: endOfWeek,
        }
        break
      case 'month':
        const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD hh:mm')
        const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD hh:mm')
        opts = {
          ...opts,
          fromBillDate: startOfMonth,
          toBillDate: endOfMonth,
        }
        break
      case 'year':
        const startOfYear = dayjs().startOf('year').format('YYYY-MM-DD hh:mm')
        const endOfYear = dayjs().endOf('year').format('YYYY-MM-DD hh:mm')
        opts = {
          ...opts,
          fromBillDate: startOfYear,
          toBillDate: endOfYear,
        }
        break
      default:
        break
    }
  }
  myEmit('onFetchData', opts)
}
const selectStatus = (num) => {
  // 再次点击
  let tmpNum = num
  if (status.value == tmpNum) {
    tmpNum = 0
  }
  const opts = {}
  if (tmpNum > 0) {
    opts.auditStatusEnum = tmpNum
  }
  status.value = tmpNum
  myEmit('onFetchData', opts)
}
const selectProcessStatus = (num) => {
  // 再次点击
  let tmpNum = num
  if (processStatus.value == tmpNum) {
    tmpNum = 0
  }
  const opts = {}
  if (tmpNum > 0) {
    opts.processStatusEnum = tmpNum
  }
  processStatus.value = tmpNum
  myEmit('onFetchData', opts)
}
</script>

<style lang="scss" scoped>
.tab-content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  padding: 20rpx;
  .filter-items.grid5 {
    grid-template-columns: repeat(5, 62px);
    overflow-x: auto;
    margin-bottom: 5px;
  }
  .status-items.grid4 {
    grid-template-columns: repeat(4, 74px);
    overflow-x: auto;
    margin-bottom: 5px;
  }
  .process-items.grid4 {
    grid-template-columns: repeat(4, 74px);
    overflow-x: auto;
  }
}
</style>
