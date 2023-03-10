<template>
  <view class="saleExtraOut-page main-index-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      :title="titleInfo.index"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <view class="search-wrap">
        <FilterGroupBtn :has-status="true" @onFetchData="fetchData" />
        <uni-search-bar placeholder="输入名称" bg-color="#EEEEEE" @confirm="handleSearch" />
      </view>

      <List ref="listRef" class="page-list" @onFetchData="fetchData">
        <template #content>
          <view v-if="store.list.length > 0" class="list-content flex flex-col">
            <DetailCard v-for="(item, index) in store.list" :key="index">
              <template #header>
                <view class="flex flex-row justify-between items-center">
                  <view class="card-title"> {{ item.code }} </view>
                  <view class="card-sub-title">
                    <Tag :name="item.auditStatusEnum.name" />
                  </view>
                </view>
              </template>
              <template #body>
                <view class="flex flex-col">
                  <ListItem
                    v-for="info in listFields"
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
                  <button size="mini" class="btn" :disabled="!checkEditable(item)" @click="handleEditClick(item.id)">
                    <img
                      :src="`/static/images/${checkEditable(item) ? 'edit-blue.png' : 'edit-disabled.png'}`"
                      class="btn-img"
                      alt="编辑"
                    />
                    <span>编辑</span>
                  </button>
                  <button size="mini" class="btn" @click="handleDetailClick(item.id)">
                    <img src="/static/images/list-details-blue.png" class="btn-img" alt="详情" />
                    <span>查看详情</span>
                  </button>
                </view>
              </template>
            </DetailCard>
          </view>
        </template>
      </List>
    </view>
    <view>
      <uni-popup ref="searchDialog" type="dialog">
        <uni-popup-dialog
          type="info"
          cancel-text="取消"
          confirm-text="确定"
          title="搜索条件"
          @confirm="handleSearchConfirm"
          @close="handleSearchClose"
        >
          <uni-forms :model="searchModel" label-width="110px">
            <uni-forms-item label="供应商名称">
              <uni-easyinput v-model="searchModel.supplierName1" class="list-val" />
            </uni-forms-item>
            <uni-forms-item label="供应商编号">
              <uni-easyinput v-model="searchModel.supplierCode1" class="list-val" />
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
import { ref } from 'vue'
import DetailCard from '@/components/card/detailCard'
import ListItem from '@/components/list/listItem'
import Navbar from '@/components/pageNavbar'
import Tag from '@/components/tag'
import FilterGroupBtn from '@/components/filter/groupButton'
import List from '@/components/list/list'
import { useSaleExtraOutStoreWithOut } from '@/store/modules/saleExtraOut'
import { usePage, useIndexPage } from '@/hooks'
import pageInfo from '@/pageInfo/saleExtraOut.json'
const listFields = pageInfo.list.fields
const searchDialog = ref()
const store = useSaleExtraOutStoreWithOut()
const listRef = ref()
const searchModel = ref({})

// page navbar title，返回的页面
const { back, titleInfo } = usePage({
  pageInfo,
  title: pageInfo.title,
  backType: 'tab',
  backUrl: pageInfo.url.home,
})
const {
  checkEditable,
  fabClick,
  fabContent,
  fabPattern,
  fetchData,
  handleDetailClick,
  handleEditClick,
  handleSearch,
  handleSearchClose,
  handleSearchConfirm,
  trigger,
} = useIndexPage({
  addUrl: pageInfo.url.add,
  editUrl: pageInfo.url.edit,
  listRef,
  searchDialog,
  searchKey: pageInfo.search.searchKey, // searchbar 传参 默认code
  searchModel,
  showUrl: pageInfo.url.show,
  store,
})
</script>

<style scoped lang="scss">
.saleExtraOut-page {
}
</style>
