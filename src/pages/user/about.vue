<template>
  <view class="about-page page-wrapper">
    <Navbar back-icon-color="#fff" title="关于" title-color="#fff" :back-text-style="{ color: '#fff' }" />
    <view class="content">
      <view class="desc">
        <text class="code">本产品</text>
        是一个基于 <text class="code">uni-app</text> 开发跨平台应用的<text class="code">高性能ERP系统</text>。
      </view>
    </view>
    <!-- #ifdef APP-PLUS -->
    <view class="version"> 当前版本：{{ version }} </view>
    <!-- #endif -->
  </view>
</template>

<script setup>
import Navbar from '@/components/pageNavbar'
</script>

<style></style>
