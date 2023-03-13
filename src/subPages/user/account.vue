<template>
  <view class="account-page page-wrapper">
    <Navbar
      back-icon-color="#fff"
      :title="titleInfo.index"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    />
    <uni-forms :model="userInfo" class="account-form" label-width="80px">
      <view label="" class="hidden">
        <uni-easyinput v-model="userInfo.id" />
      </view>
      <uni-forms-item label="用户名">
        <uni-easyinput v-model="userInfo.username" disabled />
      </uni-forms-item>
      <!-- <uni-forms-item label="头像">
        <img :src="userInfo.wechatAvatarUrl" :alt="userInfo.username" class="avatar" />
        <uni-file-picker
          v-model="userInfo.wechatAvatarUrl"
          file-extname="png,jpg"
          limit="1"
          title="从相册选图"
          file-mediatype="image"
          :source-type="['album']"
        ></uni-file-picker>
      </uni-forms-item> -->
      <uni-forms-item label="昵称">
        <uni-easyinput v-model="userInfo.name" class="list-val" />
      </uni-forms-item>
      <uni-forms-item label="公司名称">
        <uni-easyinput v-model="userInfo.companyName" class="list-val" disabled />
      </uni-forms-item>
      <uni-forms-item label="邮箱">
        <uni-easyinput v-model="userInfo.email" class="list-val" />
      </uni-forms-item>
      <uni-forms-item label="手机">
        <uni-easyinput v-model="userInfo.mobile" class="list-val" />
      </uni-forms-item>
      <uni-forms-item label="生日">
        <uni-datetime-picker v-model="userInfo.birthday" type="date" :clear-icon="false" />
      </uni-forms-item>
      <uni-forms-item label="性别">
        <uni-data-select v-model="userInfo.gender" :localdata="list"></uni-data-select>
      </uni-forms-item>
    </uni-forms>
    <button class="login-button" @click="logout">退出登录</button>
  </view>
</template>
<script setup>
import Navbar from '@/components/pageNavbar'
import { unBundle } from '@/apis/user'
import { removeToken, removeUserInfo, getUserInfo } from '@/utils/auth'
import { usePage } from '@/hooks'
const { back, titleInfo } = usePage({
  pageInfo: {},
  title: '账号管理',
  backType: 'tab',
  backUrl: '/pages/user/index',
})

const userInfo = getUserInfo()
const list = [
  {
    value: 0,
    text: '女',
  },
  {
    value: 1,
    text: '男',
  },
]
const logout = () => {
  uni.showLoading({
    title: 'waiting',
    mask: false,
  })
  unBundle().then(() => {
    removeToken()
    removeUserInfo()
    uni.hideLoading()
    uni.reLaunch({
      url: '../login/index',
    })
  })
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.account-page {
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .account-form {
    flex: 1;
    min-height: 0;
  }
}

.login-button {
  background: #e3162e;
  color: #ffffff;
  border-radius: 44px;
  margin: 22px;
}
</style>
