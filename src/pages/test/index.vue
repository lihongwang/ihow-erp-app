<template>
  <view class="app">
    <page v-if="PageCur == 'index'" text="A" color="white"></page>
    <page v-if="PageCur == 'category'" text="B" color="red"></page>
    <page v-if="PageCur == 'cart'" text="C" color="blue"></page>
    <page v-if="PageCur == 'user'" text="D" color="yellow"></page>
    <page v-if="PageCur == 'diypage'" text="E" color="green"></page>
  </view>
  <tabbar current="3" />
</template>

<script>
import page from '@/components/page/index'
export default {
  components: {
    page,
  },
  data() {
    return {
      PageCur: 'index', // 当前页面类型
      indexCur: 0, // 当前页面下标 默认为第一个
    }
  },
}
</script>

<style>
page,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
}
</style>
<style lang="scss">
bodey,
.page,
page .app {
  height: 100%;
  width: 100%;
  padding: 0;
}
</style>
