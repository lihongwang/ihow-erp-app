<template>
  <view @click="handleClick">
    <uni-easyinput disabled value="已禁用" placeholder="请输入内容"></uni-easyinput>
    <slot></slot>
  </view>
</template>

<script setup>
const handleClick = () => {}
</script>

<style></style>
