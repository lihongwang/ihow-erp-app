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
                  <CardListItem title="供 应 商" :value="item.supplierName" />
                  <CardListItem title="制单时间" :value="item.createByTime" type="date" />
                  <CardListItem title="制 单 人" :value="item.createByName" />
                  <CardListItem title="入库日期" :value="item.billDate" type="date" />
                  <CardListItem title="入库数量" :value="item.totalQty" />
                  <CardListItem title="入库金额" :value="item.totalAmount" type="price" />
                  <CardListItem title="入库仓库" :value="item.warehouseName" />
                  <CardListItem title="送货单号" :value="item.deliveryCode" />
                  <CardListItem title="结算周期" :value="item.settlementDays" />
                  <CardListItem title="备    注" :value="item.remark" />
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
import { usePurchaseInStore } from '@/store/modules/purchaseIn'
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
