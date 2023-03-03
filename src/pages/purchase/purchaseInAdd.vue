<template>
  <view class="purchase-page page-wrapper">
    <Navbar
      :is-back="true"
      back-icon-color="#fff"
      back-text=""
      title="新增采购入库单"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-forms :model="item" label-width="80px">
        <uni-forms-item label="入库日期">
          <uni-datetime-picker v-model="item.inDate" type="date" :clear-icon="false" />
        </uni-forms-item>
        <uni-forms-item label="供应商名称">
          <uni-easyinput v-model="item.supplierName" class="list-val" />
        </uni-forms-item>
        <uni-forms-item label="仓库">
          <uni-data-select v-model="item.warehouseId" :localdata="list"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="备注">
          <uni-easyinput v-model="item.remark" class="list-val" />
        </uni-forms-item>
        <button type="primary" @click="handleAddDetail(item.id)">添加明细</button>
      </uni-forms>
    </view>
    <view>
      <uni-popup ref="messageDlg" type="message">
        <uni-popup-message type="success" message="保存成功" :duration="2000"></uni-popup-message>
      </uni-popup>
      <uni-popup ref="detailDlg" type="dialog">
        <uni-popup-dialog
          type="info"
          cancel-text="取消"
          confirm-text="确定"
          title="添加明细"
          @confirm="dialogConfirm"
          @close="dialogClose"
        >
          <view>detail</view>
        </uni-popup-dialog>
      </uni-popup>
    </view>

    <uni-fab ref="fab" horizontal="left" vertical="bottom" direction="horizontal" @fabClick="handleSave" />
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import { ref } from 'vue'
const detailDlg = ref()
const messageDlg = ref()
const item = ref({})
const handleAddDetail = () => {
  detailDlg.value.open()
}
const handleSave = () => {
  detailDlg.value.open()
  // messageDlg.value.open()
}
const back = () => {
  uni.navigateTo({
    url: '/pages/purchase/purchaseIn',
  })
}
</script>

<style scoped lang="scss">
.page-content {
  padding: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
