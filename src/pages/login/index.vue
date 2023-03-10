<template>
  <view class="login-page page-wrapper">
    <!-- #ifdef MP-WEIXIN -->
    <view v-if="!wxLogined" class="mpwx-login column-center">
      <view class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="user-name mt20">
        <open-data type="userNickName"></open-data>
      </view>
      <view class="title xxl mt20 bold">微信授权登录</view>
      <button size="lg" class="white br60 row-center btn" @click="getInfo">
        <image class="mr10 image" src="/static/images/icon_wechat.png"></image>
        <text>微信一键授权</text>
      </button>
      <view class="muted mt20">微信授权登录后才可进行更多操作哦</view>
    </view>
    <LoginForm v-if="unbundled" @onSubmit="submit" />
    <!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话</button> -->
    <!--  #endif -->
    <!-- #ifdef APP-VUE || H5 -->
    <LoginForm @onSubmit="submit" />
    <!--  #endif -->
  </view>
</template>

<script setup>
import LoginForm from '@/components/loginForm'
import { ref } from 'vue'
import { getUserProfile, getWeixinCode } from '@/utils/login'
import { fetchUserInfo } from '@/utils/uniRequest'
import { setToken, setUserInfo } from '@/utils/auth'
import { appLogin, bundle } from '@/apis/user'
const unbundled = ref(false)
const wxLogined = ref(false)
const submit = (value) => {
  console.log(value)
  let method = appLogin
  // #ifdef MP-WEIXIN
  method = bundle
  // #endif
  method({
    companyCode: value.companyCode,
    username: value.username,
    password: value.password,
  }).then((res) => {
    setUserInfo(res)
    // #ifdef MP-WEIXIN
    if (res.bundled) {
      uni.switchTab({
        url: '/pages/home/index',
      })
    } else {
      uni.showToast({
        title: '系统错误，请联系管理员',
        icon: 'none',
      })
    }
    // #endif
    // #ifdef APP-PLUS || H5
    setToken(res.token)
    uni.switchTab({
      url: '/pages/home/index',
    })
    // #endif
  })
}
const getInfo = async () => {
  const res = await getUserProfile()
  console.log(res)
  if (res.errMsg === 'getUserProfile:ok') {
    wxLogin({
      signature: res.signature,
      rawData: res.rawData,
      iv: res.iv,
      encryptedData: res.encryptedData,
    })
  }
}
const wxLogin = (params) => {
  //微信登录
  getWeixinCode().then((code) => {
    fetchUserInfo({ ...params, code }).then((result) => {
      wxLogined.value = true
      if (!result) {
        unbundled.value = true
      }
    })
  })
}
// const getPhoneNumber = () => {
//   wx.checkSession({
//     complete() {
//       getInfo()
//     },
//   })
// }
</script>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  position: relative;
  color: #606266;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: url('/static/images/background/fog.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }
  .mpwx-login {
    height: 100%;

    .avatar {
      display: inline-block;
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      border: 1px solid #eee;
      overflow: hidden;
    }
    .user-name {
      height: 40rpx;
    }
    .image {
      width: 50rpx;
      height: 50rpx;
    }

    .btn {
      background-color: #09bb07;
      width: 580rpx;
      margin: 80rpx auto 0;
    }
  }

  .h5-login {
    padding-top: 100rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    box-sizing: border-box;

    .logo {
      width: 280rpx;
      height: 80rpx;
      margin-bottom: 50rpx;
    }

    .input {
      width: 670rpx;
      border-bottom: #d9d9d9;
      margin-top: 30rpx;
    }

    .sms-btn {
      border: 1px solid #d9d9d9;
      width: 176rpx;
      height: 60rpx;
      box-sizing: border-box;
    }

    .wx-login {
      margin-top: 60rpx;

      .image {
        margin-top: 40rpx;
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}
</style>
