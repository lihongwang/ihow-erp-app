<template>
  <view class="about-page page-wrapper">
    <Navbar
      back-icon-color="#fff"
      :title="titleInfo.index"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    />
    <view class="content">
      <view class="desc">
        <view class="item title">杭州皓网信息技术有限公司</view>
        <view class="block data">数据</view>
        <view class="block system">系统</view>
        <view class="block idea">决策</view>
        <view class="item detail">
          <view class="detail-text">三驾马车</view>
          <view class="detail-text">驱动智能制造</view>
          <view class="detail-text">为产业升级插上腾飞翅膀</view>
        </view>
        <view class="item info">
          <view class="info-text">公司专注于为中小型企业量身定制软件系统</view>
          <view class="sub-content">
            <view class="sub-item">
              <view class="sub-text">生产管理系统</view>
              <view class="sub-text">皮革ERP系统</view>
              <view class="sub-text">扫码仓储系统</view>
              <view class="sub-text">档案管理系统</view>
            </view>
            <view class="sub-item">
              <view class="sub-text">进销存管理系统</view>
              <view class="sub-text">条码管理软件</view>
              <view class="sub-text">报价核算软件</view>
              <view class="sub-text">工资核算软件</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
import { usePage } from '@/hooks'
const { back, titleInfo } = usePage({
  pageInfo: {},
  title: '关于我们',
  backType: 'tab',
  backUrl: '/pages/user/index',
})
</script>

<style lang="scss" scoped>
.about-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-image: url('/static/images/background/info-card.png');
  background-size: cover;
  background-repeat: no-repeat;
  .content {
    flex: 1;
    display: flex;
    justify-content: center;

    .item {
      margin: 10px 0;
      &.title {
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
      }
      &.detail {
        margin-top: 20px;
        text-align: center;
      }
      &.info {
        margin-top: 50px;
        .info-text {
          font-weight: bold;
        }
      }
    }
    .detail-text {
      margin: 10px 0;
    }
    .block {
      margin: 5px 0;
      font-weight: bold;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      &.data {
        background: #007aff;
      }
      &.system {
        margin-left: 50px;
        background: #4cd964;
      }
      &.idea {
        margin-left: 100px;
        background: #dc6a19;
      }
    }
    .sub-content {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .sub-text {
        margin: 15px 0;
        position: relative;
        padding-left: 15px;
        &:before {
          content: '*';
          position: absolute;
          left: 0;
        }
      }
    }
  }
}
</style>
