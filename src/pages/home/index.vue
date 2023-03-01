<template>
  <view class="home-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      back-text="皓网ERP"
      title="皓网ERP"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    >
    </Navbar>
    <uni-collapse v-model="accordionVal" @change="handleChange">
      <uni-collapse-item title="统计数据">
        <view class="collapse-item info-content">
          <view class="info-item grid3">
            <InfoCard title="今日采购额" info="2000" />
            <InfoCard title="本月采购额" info="2000" />
            <InfoCard title="本年采购额" info="2000" />
          </view>
          <view class="info-item grid3">
            <InfoCard title="今日销售额" info="2000" />
            <InfoCard title="本月销售额" info="2000" />
            <InfoCard title="本年销售额" info="2000" />
          </view>
          <view class="info-item grid2">
            <InfoCard title="未完成采购订单" info="2000" />
            <InfoCard title="未完成销售订单" info="2000" />
          </view>
          <view class="info-item grid2">
            <InfoCard title="当前库存数量" info="2000" />
            <InfoCard title="当前库存金额" info="2000" />
          </view>
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="导航">
        <view class="collapse-item action-content">
          <view class="info-item grid3">
            <button size="mini" type="primary">采购订单</button>
            <button size="mini" type="primary">采购入库</button>
            <button size="mini" type="primary">零采进货</button>
          </view>
          <view class="info-item grid3">
            <button size="mini" type="primary">销售订单</button>
            <button size="mini" type="primary">销售出库</button>
            <button size="mini" type="primary">零售出库</button>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import Navbar from '@/components/pageNavbar'
import InfoCard from '@/components/infoCard'
const accordionVal = ref(['0', '1', '2', '3', '4'])
const handleChange = () => {}
</script>

<style lang="scss" scoped>
.home-page {
  .info-content,
  .action-content {
    display: flex;
    flex-direction: column;
    .info-item {
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .collapse-item {
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
