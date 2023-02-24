<template>
  <view class="page">
    <view class="login-wrap">
      <view class="title">皓网ERP</view>
      <uni-forms
        ref="loginForm"
        :model-value="loginModel"
        :rules="loginRules"
        label-position="top"
        validate-trigger="bind"
      >
        <uni-forms-item label="账号" name="username">
          <uni-easyinput v-model="loginModel.username" placeholder="请输入账号" />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput v-model="loginModel.password" type="password" placeholder="请输入密码" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" :loading="loading" @click="submit(loginForm)">提交</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { reactive, ref } from 'vue'
const userStore = useUserStore()
const loginForm = ref()
const loginRules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: '账号不能为空',
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: '密码不能为空',
      },
    ],
  },
}
const loginModel: any = reactive({})
const loading = ref(false)
const submit = (formRef) => {
  console.log(formRef)
  formRef
    .validate()
    .then((value) => {
      console.log(value)
      loading.value = true
      userStore.login(value).then((res) => {
        loading.value = false
        if (res) {
          uni.navigateTo({
            url: '/pages/home/index',
          })
        }
      })
    })
    .catch((err) => {
      console.log('表单错误信息：', err)
    })
}
</script>

<style scoped lang="scss">
.page {
  padding: 15upx;
  position: relative;
}
.login-wrap {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  /* translate()函数是css3的新特性.在不知道自身宽高的情况下，可以利用它来进行水平垂直居中 */
  transform: translate(-50%, 15%);
  // #ifdef MP-WEIXIN
  transform: translate(-50%, 5%);
  // #endif
  box-sizing: border-box;
  padding: 60upx;
  flex: 1;
}
.title {
  font-weight: bold;
  font-size: 46upx;
  text-align: center;
  letter-spacing: 1rem;
  line-height: 4rem;
}

.login-btn-box {
  width: 100%;
  height: 300upx;
  align-self: center;
  justify-content: center;
  .btn-tk {
    align-items: center;
  }
}
</style>
