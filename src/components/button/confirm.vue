<template>
  <view>
    <button type="warn" size="mini" @click="handleDeleteItem(detailItem)">删除</button>
    <uni-popup ref="confirmDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancel-text="取消"
        confirm-text="确定"
        title="确认"
        content="确定删除？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const emits = defineEmits(['onDelete'])
const handleDeleteItem = () => {
  confirmDialog.value.open()
}
const confirmDialog = ref()
const dialogConfirm = () => {
  emits('onDelete')
  confirmDialog.value.close()
}
const dialogClose = () => {
  confirmDialog.value.close()
}
</script>

<style></style>
