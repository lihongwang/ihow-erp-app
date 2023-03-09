<template>
  <view class="page-content-wrap">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      :background="background"
      title="我的"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    >
    </Navbar>

    <uni-list>
      <uni-list-item
        :show-extra-icon="true"
        show-arrow
        clickable
        :extra-icon="icons.account"
        title="帐号管理"
        @click="goToPage('account')"
      />
      <uni-list-item
        :show-extra-icon="true"
        show-arrow
        clickable
        :extra-icon="icons.message"
        title="新消息通知"
        @click="goToPage('message')"
      />
      <uni-list-item
        :show-extra-icon="true"
        show-arrow
        clickable
        :extra-icon="icons.feedback"
        title="问题反馈"
        @click="goToPage('feedback')"
      />
      <uni-list-item
        :show-extra-icon="true"
        show-arrow
        clickable
        :extra-icon="icons.service"
        title="服务条款及协议"
        @click="goToPage('service')"
      />
      <uni-list-item
        :show-extra-icon="true"
        show-arrow
        clickable
        :extra-icon="icons.about"
        title="关于我们"
        @click="goToPage('about')"
      />
      <uni-list-item
        :show-extra-icon="true"
        show-arrow
        clickable
        :extra-icon="icons.contact"
        title="联系我们"
        @click="goToPage('contact')"
      />
    </uni-list>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
const icons = {
  account: {
    color: '#007aff',
    size: '22',
    type: 'gear-filled',
  },
  message: {
    color: '#9720dc',
    size: '22',
    type: 'notification-filled',
  },
  feedback: {
    color: '#aaaaff',
    size: '22',
    type: 'email-filled',
  },
  service: {
    color: '#aa557f',
    size: '22',
    type: 'shop-filled',
  },
  about: {
    color: '#dc6a19',
    size: '22',
    type: 'info-filled',
  },
  contact: {
    color: '#4cd964',
    size: '22',
    type: 'contact-filled',
  },
}
const goToPage = (url) => {
  // if (this.login) {
  uni.navigateTo({
    url: url,
  })
  // } else {
  // uni.navigateTo({
  //   url: 'login',
  // })
  // }
}
</script>

<style>
.m_top20 {
  margin-top: 20px;
}

.center {
  flex-direction: column;
}

.logo {
  height: 120px;
  padding: 10px;
  background-color: #2fc25b;
  display: flex;
}

.logo-hover {
  opacity: 0.8;
}

.logo-img {
  width: 150upx;
  height: 150upx;
  border-radius: 150upx;
}

.logo-title {
  height: 150upx;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-left: 20upx;
}

.uer-name {
  height: 60upx;
  line-height: 60upx;
  font-size: 38upx;
  color: #ffffff;
  line-height: 75px;
}

.btn {
  position: initial;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
