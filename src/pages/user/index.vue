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

    <CellGroup class="m_top20">
      <CellItem title="帐号管理" @click="goToPage('account')">
        <template #icon>
          <UserFilled color="#22c1a9" />
        </template>
      </CellItem>
      <CellItem title="新消息通知" @click="goToPage('message')">
        <template #icon>
          <ChatSquare color="#9720dc" />
        </template>
      </CellItem>
      <CellItem title="问题反馈" @click="goToPage('feedback')">
        <template #icon>
          <QuestionFilled color="#aaaaff" />
        </template>
      </CellItem>
      <CellItem title="服务条款及协议" @click="goToPage('service')">
        <template #icon>
          <InfoFilled color="#aa557f" />
        </template>
      </CellItem>
      <CellItem title="关于应用" @click="goToPage('about')">
        <template #icon>
          <Guide color="#dc6a19" />
        </template>
      </CellItem>
    </CellGroup>
  </view>
</template>

<script setup>
import CellGroup from '../../components/cell/cellGroup'
import CellItem from '../../components/cell/cellItem'
import Navbar from '@/components/pageNavbar'

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
