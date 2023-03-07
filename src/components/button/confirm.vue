<template>
  <view>
    <button type="warn" size="mini" :disabled="props.disabled" @click="handleDeleteItem(detailItem)">删除</button>
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
import { ref, defineEmits, defineProps } from 'vue'
const props = defineProps(['disabled'])
const emits = defineEmits(['onDelete'])
const confirmDialog = ref()
const handleDeleteItem = () => {
  confirmDialog.value.open()
}
const dialogConfirm = () => {
  emits('onDelete')
  confirmDialog.value.close()
}
const dialogClose = () => {
  confirmDialog.value.close()
}
</script>

<style></style>
