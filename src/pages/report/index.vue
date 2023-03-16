<template>
  <view class="report-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      title="报表"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-section title="库存报表" :right="false" :show-line="true" type="line">
        <view class="info-item grid2">
          <view class="info-btn-wrap stock-detail" @click="handleClick('/subPages/report/reportStockDetail')">
            <img class="btn-img" src="/static/images/table-total.png" alt="库存汇总报表" />
            <button size="mini" class="normal-btn">库存汇总报表</button>
          </view>

          <view class="info-btn-wrap safe-qty" @click="handleClick('/subPages/report/reportSafeQty')">
            <img class="btn-img" src="/static/images/warning.png" alt="库存预警报表" />
            <button size="mini" class="normal-btn">库存预警报表</button>
          </view>
        </view>
      </uni-section>
      <uni-section title="进度报表" :right="false" :show-line="true" type="line">
        <view class="info-item grid2">
          <view class="info-btn-wrap sale-order-process" @click="handleClick('/subPages/report/saleOrderProcess')">
            <img class="btn-img" src="/static/images/sale.png" alt="销售订单进度" />
            <button size="mini" class="normal-btn">销售订单进度</button>
          </view>

          <view
            class="info-btn-wrap purchase-order-process"
            @click="handleClick('/subPages/report/purchaseOrderProcess')"
          >
            <img class="btn-img" src="/static/images/purchase.png" alt="采购订单进度" />
            <button size="mini" class="normal-btn">采购订单进度</button>
          </view>
        </view>
      </uni-section>
      <uni-section title="财务报表" :right="false" :show-line="true" type="line">
        <view class="info-item grid2">
          <view class="info-btn-wrap receivable" @click="handleClick('/subPages/report/reportReceivable')">
            <img class="btn-img" src="/static/images/receive.png" alt="应收款明细" />
            <button size="mini" class="normal-btn">应收款明细</button>
          </view>
          <view class="info-btn-wrap payable" @click="handleClick('/subPages/report/reportPayable')">
            <img class="btn-img" src="/static/images/pay.png" alt="应付款明细" />
            <button size="mini" class="normal-btn">应付款明细</button>
          </view>
        </view></uni-section
      >
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
const handleClick = (url) => {
  uni.navigateTo({
    url,
  })
}
</script>

<style lang="scss" scoped>
.report-page {
  .page-content {
    width: 100%;
    box-sizing: border-box;

    button {
      width: 120px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .info-item {
    margin-top: 20px;
  }
  .info-btn-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btn-img {
      background: #303f9f;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      padding: 10px;
      margin-bottom: 10px;
    }
    &.safe-qty .btn-img {
      background: #b388ff;
    }
    &.sale-order-process .btn-img {
      background: #448aff;
    }
    &.purchase-order-process .btn-img {
      background: #0277bd;
    }
    &.receivable .btn-img {
      background: #00838f;
    }
    &.payable .btn-img {
      background: #33691e;
    }
  }
}
</style>
