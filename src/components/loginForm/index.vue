<template>
  <view class="login-wrap">
    <view class="title">皓网ERP</view>
    <uni-forms
      ref="loginForm"
      :model-value="loginModel"
      :rules="loginRules"
      label-position="top"
      validate-trigger="bind"
    >
      <uni-forms-item label="公司编号" name="companyCode">
        <uni-easyinput v-model="loginModel.companyCode" placeholder="请输入公司编号" />
      </uni-forms-item>
      <uni-forms-item label="账号" name="username">
        <uni-easyinput v-model="loginModel.username" placeholder="请输入账号" />
      </uni-forms-item>
      <uni-forms-item label="密码" name="password">
        <uni-easyinput v-model="loginModel.password" type="password" placeholder="请输入密码" />
      </uni-forms-item>
    </uni-forms>
    <button class="submit-btn" type="primary" :loading="loading" @click="submit(loginForm)">提交</button>
  </view>
</template>
<script setup>
import { ref, reactive, defineEmits } from 'vue'
const loginForm = ref()
const myEmit = defineEmits(['onSubmit'])
const loading = ref(false)
const submit = (formRef) => {
  formRef
    .validate()
    .then((value) => {
      loading.value = true
      try {
        myEmit('onSubmit', value)
      } catch (error) {
        uni.showToast({
          title: '代码错误',
          icon: 'none',
        })
      }
    })
    .catch((err) => {
      console.log('表单错误信息：', err)
    })
}
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
const loginModel = reactive({
  companyCode: 'ZHONGHUA',
  username: '15979000884',
  password: 'a123456',
})
</script>
<style scoped lang="scss">
.login-wrap {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  /* translate()函数是css3的新特性.在不知道自身宽高的情况下，可以利用它来进行水平垂直居中 */
  transform: translate(-50%, -50%);
  // #ifdef MP-WEIXIN
  transform: translate(-50%, -45%);
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
.submit-btn {
  margin-top: 50px;
}
</style>
