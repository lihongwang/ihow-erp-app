<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>
      <tui-button disabled loading :size="34" bold>页面主操作 Loading</tui-button>
    </view>
    <view><tui-icon name="about"></tui-icon> <tui-icon name="about-fill"></tui-icon></view>
    <view
      ><tui-badge dot></tui-badge>
      <tui-badge dot type="warning"></tui-badge>
      <tui-badge dot type="green"></tui-badge>
    </view>
    <view>
      <tui-card :image="card.img" :title="card.title" :tag="card.tag">
        <template #body>
          <view class="tui-default"> 默认卡片内容部分 slot=>body </view>
        </template>
        <template #footer>
          <view class="tui-default"> 默认卡片底部 slot=>footer </view>
        </template>
      </tui-card>
    </view>
    <view class="bg-red-500">你好，世界！</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
const card = {
  img: {
    url: '/static/images/news/avatar_1.jpg',
  },
  title: {
    text: 'CSDN云计算',
  },
  tag: {
    text: '1小时前',
  },
  header: {
    bgcolor: '#F7F7F7',
    line: true,
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
