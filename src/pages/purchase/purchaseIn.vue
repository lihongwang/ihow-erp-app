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
const store = usePurchaseInStore()
const listRef = ref()
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
