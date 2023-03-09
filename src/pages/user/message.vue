<template>
  <view class="message-page page-wrapper">
    <Navbar
      back-icon-color="#fff"
      :title="titleInfo.index"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    />
    <view class="message">
      <view class="empty-box">
        <text>没有任何消息</text>
        <img src="/static/images/empty.png" alt="没有任何消息" />
      </view>
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import { usePage } from '@/hooks'
const { back, titleInfo } = usePage({
  pageInfo: {},
  title: '新消息通知',
  backType: 'tab',
  backUrl: '/pages/user/index',
})
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-box {
  margin-top: 50px;
}
</style>
