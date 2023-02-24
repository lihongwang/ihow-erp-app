<template>
  <view class="purchase-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      title="采购订单"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <view class="tab-content">
        <uni-badge class="uni-badge-left-margin" :text="value" absolute="rightTop" size="small">
          <view :class="{ active: modeIndex === 0 }" class="tab-item" @click="selectStatus(0)">
            <text class="tab-item-text">全部</text></view
          >
        </uni-badge>
        <uni-badge class="uni-badge-left-margin" :text="value" absolute="rightTop" size="small">
          <view :class="{ active: modeIndex === 1 }" class="tab-item" @click="selectStatus(1)"
            ><text class="tab-item-text">已审核</text></view
          >
        </uni-badge>
        <uni-badge class="uni-badge-left-margin" :text="value" absolute="rightTop" size="small">
          <view :class="{ active: modeIndex === 2 }" class="tab-item" @click="selectStatus(2)">
            <text class="tab-item-text">未审核</text></view
          >
        </uni-badge>
        <uni-badge class="uni-badge-left-margin" :text="value" absolute="rightTop" size="small">
          <view :class="{ active: modeIndex === 3 }" class="tab-item" @click="selectStatus(3)"
            ><text class="tab-item-text">已关闭</text></view
          >
        </uni-badge>
      </view>
      <uni-search-bar placeholder="输入订单号" bg-color="#EEEEEE" @confirm="search" />
      <view v-if="orderList.length > 0" class="flex flex-col">
        <view v-for="(item, index) in orderList" :key="index">
          <Card>
            <template #header>
              <view class="flex flex-row justify-between items-center">
                <view class="card-title"> {{ '编号：' + item.code }} </view>
                <view class="card-sub-title">
                  <uni-tag
                    :text="statusList[item.status]?.text"
                    :type="statusList[item.status]?.type || 'success'"
                  ></uni-tag>
                </view>
              </view>
            </template>
            <template #body>
              <view class="">
                <view class="flex flex-col">
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">供 应 商：</text>
                    <text>{{ item.supplier }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">联 系 人：</text>
                    <text>{{ item.contact }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">联系电话：</text>
                    <text>{{ item.phone }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">交货方式：</text>
                    <text>{{ typeList[item.type].label }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">产品总数：</text>
                    <text>{{ item.totalNums }}</text>
                  </text>
                  <text class="flex flex-row m-2 items-center justify-start">
                    <text class="font-bold">制单时间：</text>
                    <text>{{ item.createtime }}</text>
                  </text>
                </view>
              </view>
            </template>
            <template #footer>
              <view gutter="16" class="flex flex-row justify-center p-2">
                <button @click="handleClick(item.id)">查看详情</button>
              </view>
            </template>
          </Card>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Card from '@/components/card/index'
import Navbar from '@/components/pageNavbar'
import { usePurchaseStore } from '@/store/modules/purchase'
import { ref } from 'vue'
const store = usePurchaseStore()
const orderList = store.list
const value = orderList.length
const statusList = [
  {
    text: '未审核',
    type: 'info',
  },
  {
    text: '审核失败',
    type: 'danger',
  },
  {
    text: '待入库',
    type: 'warning',
  },
  {
    text: '已完成',
    type: 'success',
  },
]
const typeList = [
  {
    label: '买家自提',
  },
  {
    label: '卖家发货',
  },
  {
    label: '代发',
  },
]

const back = () => {
  uni.switchTab({
    url: '/pages/home/index',
  })
}
const modeIndex = ref(0)
const selectStatus = (num) => {
  modeIndex.value = num
}

const handleClick = (id) => {
  console.log(id)
  uni.navigateTo({
    url: 'orderDetail?id=' + id,
  })
}
</script>

<style scoped lang="scss">
.page-content-wrap {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
::v-deep .tab-content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: 20rpx;
  .uni-badge {
    right: 0 !important;
  }
  .tab-item {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 20rpx;
    padding: 15rpx;
    height: 60rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    padding: 0 15rpx;
    /* #endif */
    flex: 1;
    border-color: #e5e5e5;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    .tab-item-text {
      font-size: 28rpx;
      color: #333;
    }
    &.active {
      font-weight: bold;
      background: #007aff;
      .tab-item-text {
        color: #fff;
      }
    }
  }
}
</style>
