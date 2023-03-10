<template>
  <view class="report-detail-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      :title="title"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <view class="search-wrap">
        <FilterGroupBtn :has-status="true" :has-process-status="true" @onFetchData="fetchData" />
        <uni-search-bar placeholder="输入单号" bg-color="#EEEEEE" @confirm="handleSearch" />
      </view>
      <view class="uni-pagination-box">
        <uni-pagination
          show-icon
          :page-size="pageInfo.pageSize"
          :current="pageInfo.page"
          :total="pageInfo.total"
          @change="handleChange"
        />
      </view>
      <uni-table
        ref="tableRef"
        :loading="loading"
        border
        stripe
        empty-text="暂无更多数据"
        @selection-change="selectionChange"
      >
        <uni-tr>
          <uni-th v-for="col in tableFields" :key="col.name" align="center" :width="col.width">{{ col.title }}</uni-th>
        </uni-tr>
        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td v-for="col in tableFields" :key="col.name" align="center">
            <view class="table-cell" :title="formatData(col, item)">
              {{ formatData(col, item) }}
            </view>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
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
          <uni-forms-item v-for="field in searchFields" :key="field.name" :label="field.title">
            <FormField
              :field="field"
              :type="field.type"
              :name="field.name"
              :item="searchModel"
              :field-context="fieldContext"
            />
          </uni-forms-item>
        </uni-forms>
      </uni-popup-dialog>
    </uni-popup>
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
import Navbar from '@/components/pageNavbar'
import FormField from '@/components/form/FormField'
import FilterGroupBtn from '@/components/filter/groupButton'
import { useReportDetailPage } from '@/hooks'
import reportPageInfo from '@/pageInfo/report/saleOrderProcess.json'
const { title, code, searchFields, tableFields } = reportPageInfo
const searchDialog = ref()
const searchModel = ref({})
const tableRef = ref()
const tableData = ref()
const fieldContext = ref({})
const pageInfo = ref({
  page: 0,
  pageSize: 20,
  total: 0,
})
const { fetchData, fabPattern, fabContent, fabClick, trigger, handleChange, back, formatData } = useReportDetailPage({
  searchModel,
  searchDialog,
  code,
  pageInfo,
  tableData,
})
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;
  box-sizing: border-box;

  ::v-deep table {
    table-layout: fixed;
    min-width: 1000px;
    td,
    th {
      padding: 3px !important;
    }
  }
}
</style>
