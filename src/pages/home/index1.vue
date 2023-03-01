<template>
  <view class="home-page page-wrapper">
    <Navbar
      :is-back="false"
      back-icon-color="#fff"
      back-text="皓网ERP"
      title="皓网ERP"
      title-color="#fff"
      :back-text-style="{ color: '#fff' }"
    ></Navbar>
    <view class="page-content">
      <uni-swiper-dot
        class="uni-swiper-dot-box"
        :info="info"
        :current="current"
        mode="nav"
        :dots-styles="dotsStyles"
        field="content"
        @clickItem="clickItem"
      >
        <swiper class="swiper-box" :current="swiperDotIndex" @change="change">
          <swiper-item v-for="(item, index) in 3" :key="index">
            <view class="swiper-item" :class="'swiper-item' + index">
              <text style="color: #fff; font-size: 32px">{{ index + 1 }}</text>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
      <view v-for="(listitem, index) in menuList" :key="index">
        <uni-section :title="listitem.title" :right="false" :show-line="true" type="line">
          <uni-grid :highlight="true" :column="3" :show-border="false" :square="false">
            <uni-grid-item
              v-for="(item, index) in listitem.list"
              :key="index"
              :index="index"
              @tap="handleClick(item.url ? item.url : null)"
            >
              <view class="grid-item-box" style="background-color: #fff">
                <uni-icons type="image" :size="30" color="#777" />
                <text class="text">{{ item.title }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </uni-section>
      </view>
    </view>
  </view>
</template>
<script setup>
import { useMenuStore } from '@/store/modules/menu'
import Navbar from '@/components/pageNavbar'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
const menuStore = useMenuStore()
const menuList = ref([])
onShow(() => {
  console.log('home show')
  menuStore.init().then((menus) => {
    menuList.value = menus
  })
})
const current = ref(0)
const swiperDotIndex = ref(0)
const change = (e) => {
  current.value = e.detail.current
}
const clickItem = (e) => {
  swiperDotIndex.value = e
}
const info = [
  {
    colorClass: 'uni-bg-red',
    url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
    content: '内容 A',
  },
  {
    colorClass: 'uni-bg-green',
    url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
    content: '内容 B',
  },
  {
    colorClass: 'uni-bg-blue',
    url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
    content: '内容 C',
  },
]
const dotsStyles = [
  {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    border: '1px rgba(0, 0, 0, .3) solid',
    color: '#fff',
    selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
    selectedBorder: '1px rgba(0, 0, 0, .9) solid',
  },
  {
    backgroundColor: 'rgba(255, 90, 95,0.3)',
    border: '1px rgba(255, 90, 95,0.3) solid',
    color: '#fff',
    selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
    selectedBorder: '1px rgba(255, 90, 95,0.9) solid',
  },
  {
    backgroundColor: 'rgba(83, 200, 249,0.3)',
    border: '1px rgba(83, 200, 249,0.3) solid',
    color: '#fff',
    selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
    selectedBorder: '1px rgba(83, 200, 249,0.9) solid',
  },
]
// const background = {
//   'background-size': '100% auto',
//   background: 'url(../../static/images/bg_hometop.png) no-repeat',
// }
const handleClick = (url) => {
  if (url) {
    uni.navigateTo({
      url: url,
    })
  }
}
</script>
<style lang="scss">
.uni-grid-item {
  margin: 5px;
}
.swiper-box {
  height: 200px;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #fff;
}

.swiper-item0 {
  background-color: #cee1fd;
}

.swiper-item1 {
  background-color: #b2cef7;
}

.swiper-item2 {
  background-color: #cee1fd;
}

.image {
  width: 750rpx;
}

/* #ifndef APP-NVUE */
::v-deep .image img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

/* #endif */

@media screen and (min-width: 500px) {
  .uni-swiper-dot-box {
    width: 400px;
    margin: 0 auto;
    margin-top: 8px;
  }

  .image {
    width: 100%;
  }
}

.uni-bg-red {
  background-color: #ff5a5f;
}

.uni-bg-green {
  background-color: #09bb07;
}

.uni-bg-blue {
  background-color: #007aff;
}
</style>
