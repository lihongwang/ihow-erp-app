<template>
  <view class="message-page page-wrapper">
    <Navbar back-icon-color="#fff" title="消息" title-color="#fff" :back-text-style="{ color: '#fff' }" />
    <view class="message">
      <text>没有任何消息</text>
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
