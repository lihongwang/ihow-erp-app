<template>
  <view class="contact-page page-wrapper">
    <Navbar
      back-icon-color="#fff"
      :title="titleInfo.index"
      title-color="#fff"
      :custom-back="back"
      :back-text-style="{ color: '#fff' }"
    />
    <view class="content">
      <view class="detail-info">
        <view class="title item">杭州皓网信息技术有限公司</view>
        <view class="item">浙江省杭州市临平区</view>
        <view class="item">欣北·钱江国际广场南区-3号楼-614室</view>
        <view class="item phone">
          <a href="tel:18895515016" class="viewy-2">
            <uni-icons type="phone" size="20"></uni-icons>
            <span class="item-text">Tel: 18895515016（姚先生）</span>
          </a>
        </view>
        <view class="item phone">
          <a href="tel:18601692529" class="viewy-2">
            <uni-icons type="phone" size="20"></uni-icons>
            <span class="item-text">Tel: 18601692529（项先生）</span>
          </a>
        </view>
        <view class="item email">
          <a href="mailto:it_support@ihownet.com" class="viewy-2">
            <uni-icons type="email" size="20"></uni-icons>
            <span class="item-text">Email: it_support@ihownet.com</span>
          </a>
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
  title: '联系我们',
  backType: 'tab',
  backUrl: '/pages/user/index',
})
</script>

<style lang="scss" scoped>
.contact-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: contain;
    background-repeat: repeat;
    &:before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      background-image: url('/static/images/background/paper-bg.png');
      background-repeat: repeat;
      background-position: 50% 0;
      background-size: contain;
    }
    .detail-info {
      margin-top: -30px;
    }
    .item {
      margin: 15px 0;
      .viewy-2 {
        display: flex;
        align-items: center;
      }
      .item-text {
        margin-left: 5px;
      }
      &.title {
        font-weight: bold;
        margin-bottom: 50px;
        text-align: center;
      }
      &.phone,
      &.email {
        margin-top: 50px;
      }
    }
    a {
      text-decoration: none;
      font-weight: bold;
    }
  }
}
</style>
