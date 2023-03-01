<template>
  <div class="item-wrap">
    <div class="bg-wrapper">
      <div class="item-content">
        <div class="left">
          <i class="ti ti-users text-3xl"></i>
        </div>
        <div class="right">
          <p>{{ title }}</p>
          <h3 class="num">
            {{ info }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
  },
  setup() {},
  data() {},
}
</script>
<style scoped lang="scss">
.item-wrap {
  padding: 10px;
  border-radius: 0.5rem;
  background-color: rgba(243, 244, 246, 1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  .bg-wrapper {
    background-image: url('/static/images/background/info-card.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .item-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left {
    position: absolute;
  }
  .left,
  .right {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    margin-left: auto;
    flex-direction: column;
    h3 {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 2rem;
    }
    p {
      font-weight: 500;
      color: rgba(156, 163, 175, 1);
    }
  }
}
</style>
