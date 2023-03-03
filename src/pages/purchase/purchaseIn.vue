<template>
  <view class="purchase-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      title="采购入库单"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <FilterGroupBtn :has-status="true" @onFetchData="fetchData" />
      <uni-search-bar placeholder="输入入库单号" bg-color="#EEEEEE" @confirm="search" />
      <List ref="listRef" @onFetchData="fetchData">
        <template #content>
          <view v-if="store.list.length > 0" class="flex flex-col">
            <DetailCard v-for="(item, index) in store.list" :key="index">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ item.code }} </view>
                  <view class="card-sub-title">
                    <uni-tag :text="item.auditStatusEnum.name" :type="statusList[item.auditStatusEnum.name]"></uni-tag>
                  </view>
                </view>
              </template>
              <template #body>
                <view class="flex flex-col">
                  <CardListItem
                    v-for="info in itemInfoArrayForList"
                    :key="info.name"
                    :title="info.title"
                    :value="item[info.name] || item[info.aliasName]"
                    :type="info.type"
                    :params="info.params || {}"
                  />
                </view>
              </template>
              <template #footer>
                <view gutter="16" class="flex flex-row justify-center">
                  <button size="mini" class="more-btn" @click="handleClick(item.id)">查看详情</button>
                </view>
              </template>
            </DetailCard>
          </view>
        </template>
      </List>
    </view>
    <view>
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog
          type="info"
          cancel-text="取消"
          confirm-text="确定"
          title="搜索条件"
          @confirm="dialogConfirm"
          @close="dialogClose"
        >
          <uni-forms :model="searchModel" label-width="80px">
            <uni-forms-item label="昵称">
              <uni-easyinput v-model="searchModel.name" class="list-val" />
            </uni-forms-item>
          </uni-forms>
        </uni-popup-dialog>
      </uni-popup>
    </view>

    <uni-fab
      ref="fab"
      :pattern="fabPattern"
      :content="fabContent"
      horizontal="left"
      vertical="bottom"
      direction="horizontal"
      @trigger="trigger"
      @fabClick="fabClick"
    />
  </view>
</template>

<script setup>
import DetailCard from '@/components/card/detailCard'
import CardListItem from '@/components/card/listItem'
import Navbar from '@/components/pageNavbar'
import FilterGroupBtn from '@/components/filter/groupButton'
import List from '@/components/list/list'
import { usePurchaseInStore, itemInfoArrayForList } from '@/store/modules/purchaseIn'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const alertDialog = ref()
const store = usePurchaseInStore()
const listRef = ref()
const searchModel = ref({})
const fabPattern = {
  color: '#7A7E83',
  backgroundColor: '#fff',
  selectedColor: '#007AFF',
  buttonColor: '#007AFF',
  iconColor: '#fff',
}
const fabContent = [
  {
    iconPath: '/static/image.png',
    selectedIconPath: '/static/image-active.png',
    text: '新增',
    active: false,
  },
  {
    iconPath: '/static/home.png',
    selectedIconPath: '/static/home-active.png',
    text: '搜索',
    active: false,
  },
]
const dialogConfirm = () => {
  console.log('点击确认')
}
const dialogClose = () => {
  console.log('点击关闭')
}
const trigger = (e) => {
  if (e.index == 0) {
    uni.navigateTo({
      url: '/pages/purchase/purchaseInAdd',
    })
  } else {
    alertDialog.value.open()
  }
}
const fabClick = () => {
  uni.showToast({
    title: '点击了悬浮按钮',
    icon: 'none',
  })
}
onLoad(() => {
  setTimeout(() => {
    fetchData()
  }, 100)
})
const fetchData = (data = {}, isMore) => {
  store[isMore ? 'loadMore' : 'init']({
    ...data,
  }).then((res) => {
    const { setPageInfo } = listRef?.value || {}
    setPageInfo?.({
      shown: true,
      page: res.page + 1,
      pageSize: res.pageSize,
      total: res.total,
    })
  })
}
const statusList = {
  未审核: 'info',
  已审核: 'success',
}

const back = () => {
  uni.switchTab({
    url: '/pages/home/index',
  })
}

const handleClick = (id) => {
  console.log(id)
  uni.navigateTo({
    url: '/pages/purchase/purchaseInDetail?id=' + id,
  })
}
</script>

<style scoped lang="scss">
.page-content-wrap {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
