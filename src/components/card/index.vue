<template>
  <uni-card class="card shadow rounded">
    <template #title>
      <view class="card-header">
        <view v-if="!$slots.header" class="header-wrapper">
          <view v-if="title" class="card-title">
            {{ title }}
          </view>
          <view v-if="subTitle" class="card-sub-title">
            {{ subTitle }}
          </view>
        </view>
        <slot v-else name="header"></slot>
      </view>
    </template>
    <view class="card-body"><slot name="body"></slot></view>
    <template #actions>
      <view class="card-footer">
        <slot name="footer"></slot>
      </view>
    </template>
  </uni-card>
</template>
<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: '',
    },
    // 右边副标题内容
    subTitle: {
      type: String,
      default: '更多',
    },
  },
}
</script>
<style lang="scss" scoped>
.card-header {
  border-bottom: 1px solid rgb(226 232 240);
  padding: 1rem;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.card-title {
  font-weight: 500;
}

// .card-sub-title {
//   color: rgb(148 163 184);
//   font-size: 0.875rem;
//   line-height: 1.25rem;
// }
.card-footer {
  border-top: 1px solid rgb(226 232 240);
}
</style>
