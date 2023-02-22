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
    <view>
      <input v-model="formData.age" type="text" placeholder="请输入年龄" class="textarea" />
      <uni-forms :model-value="formData">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput v-model="formData.name" type="text" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="年龄" name="name">
          <input v-model="formData.age" type="text" placeholder="请输入年龄" />
        </uni-forms-item>
        <uni-forms-item required name="hobby" label="兴趣爱好">
          <uni-data-checkbox v-model="formData.hobby" multiple :localdata="hobby" />
        </uni-forms-item>
      </uni-forms>
      <button @click="submitForm">Submit</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
const formData = {
  name: 1,
  age: 1,
  hobby: 1,
}
const hobby = [{ label: 1, value: 1 }]
const submitForm = function () {}
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
