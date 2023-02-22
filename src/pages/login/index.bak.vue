<template>
  <view class="container">
    <button class="wxLogin" @click="login">微信用户一键登录</button>
  </view>
</template>

<script>
import { getUrlParms, isWeiXin } from '@/utils'
export default {
  onLoad() {
    //判断URL是否携带了code参数
    this.isCode()
  },
  methods: {
    isCode() {
      if (getUrlParms('code')) {
        //如果有code参数就直接调用获取用户信息的接口
        this.getUserInfo(getUrlParms('code'))
      }
    },
    //微信快速登录
    login() {
      //  微信快速登录
      this.wechatQuickLogin()
    },
    // 微信快速登录
    async wechatQuickLogin() {
      // 判断当前浏览器是否是微信浏览器
      if (isWeiXin()) {
        // 判断浏览器是否携带了code参数
        if (!getUrlParms('code')) {
          //获取token，通过token拿appid
          const token = await this.getToken()
          //获取appid
          const { data: res } = await this.getWxAppid(token.Token)
          const appId = res.appId
          this.wxQuickLogin(appId)
        }
      } else {
        uni.showToast({
          title: '当前浏览器不支持微信快速登录',
          icon: 'none',
        })
      }
    },

    // 获取token
    async getToken() {
      const [err, { data: res }] = await uni.request({
        url: '后端地址',
      })
      if (res.Token) {
        return res
      }
      uni.showToast({
        title: '获取权限失败',
        icon: 'none',
      })
    },
    // 获取微信appid
    async getWxAppid(token) {
      const [err, { data: res }] = await uni.request({
        url: '后端地址',
      })
      if (res.code == 1) {
        return res
      }
      uni.showToast({
        title: '获取微信参数失败',
        icon: 'none',
      })
    },
    wxQuickLogin(appId) {
      const JumpUrl = window.location.href
      const red_uri = encodeURIComponent(JumpUrl)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${red_uri}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`
    },
    // 获取用户信息
    async getUserInfo(code) {
      const [err, { data: res }] = await uni.request({
        url: `后端地址`,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      if (res.Token) {
        // 储存token 以及用户信息
        localStorage.setItem('token', res.Token)
        localStorage.setItem('userInfo', res.UserInfo)
        this.$store.commit('UPDATE_userInfo', res.UserInfo)
        //跳转至首页
        uni.switchTab({
          url: '/pages/index/index',
        })
      } else {
        uni.showToast({
          title: '用户信息获取失败',
          icon: 'none',
        })
      }
    },
  },
}
</script>
<style lang="scss"></style>
