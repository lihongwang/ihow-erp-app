<template>
  <view class="report-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      title="库存"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-section title="库存" :right="false" :show-line="true" type="line">
        <uni-table
          ref="tableRef"
          :loading="loading"
          border
          stripe
          empty-text="暂无更多数据"
          @selection-change="selectionChange"
        >
          <uni-tr>
            <uni-th align="center">商品名称</uni-th>
            <uni-th width="50" align="center">库存</uni-th>
            <uni-th width="100" align="center">仓库</uni-th>
            <uni-th width="50" align="center">库龄</uni-th>
          </uni-tr>
          <uni-tr v-for="(item, index) in tableData" :key="index">
            <uni-td align="center">{{ item.name }}</uni-td>
            <uni-td align="center">
              <view class="name">{{ item.inventory }}</view>
            </uni-td>
            <uni-td align="center">{{ item.wName }}</uni-td>
            <uni-td align="center">{{ item.age }}</uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination
            show-icon
            :page-size="pageSize"
            :current="pageCurrent"
            :total="total"
            @change="handleChange"
          />
        </view>
      </uni-section>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
const loading = ref(false)
const pageSize = 10
// 当前页
const pageCurrent = 1
// 数据总量
const total = 0
const tableRef = ref()
const tableData = [
  {
    inventory: '1000',
    name: '鱼鳞布',
    wName: '成品仓',
    age: 1,
  },
  {
    inventory: '2000',
    name: '鱼鳞布',
    wName: '成品仓',
    age: 1,
  },
  {
    inventory: '3000',
    name: '鱼鳞布',
    wName: '成品仓',
    age: 1,
  },
  {
    inventory: '4000',
    name: '鱼鳞布',
    wName: '成品仓',
    age: 1,
  },
]
const handleChange = (e) => {
  this.$refs.table.clearSelection()
  this.getData(e.current)
}
</script>

<style>
.page-content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
