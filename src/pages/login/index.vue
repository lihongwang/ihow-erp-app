<template>
  <view class="page">
    <view class="login-wrap">
      <uni-forms ref="loginForm" :rules="loginRules" label-position="top" :model-value="loginModel">
        <uni-forms-item label="账号" required>
          <uni-easyinput v-model="loginModel.username" placeholder="请输入账号" />
        </uni-forms-item>
        <uni-forms-item label="密码" required>
          <uni-easyinput v-model="loginModel.password" placeholder="请输入密码" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" :loading="loading" @click="submit">提交</button>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'
import { reactive, ref } from 'vue'
const userStore = useUserStore()
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
  username: '',
  password: '',
})
const loading = ref(false)
const submit = async () => {
  loading.value = true
  const res = await userStore.login(loginModel)
  loading.value = false
  if (res) {
    uni.navigateTo({
      url: '/pages/home/index',
    })
  }
}
</script>

<style scoped lang="scss">
.page {
  padding: 15upx;
  height: 100%;
}
.login-wrap {
  box-sizing: border-box;
  padding: 30px;
}
.title {
  font-weight: bold;
  font-size: 46upx;
  text-align: center;
  line-height: 4rem;
}

.tk-column {
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

.logo {
  width: 100%;
}
</style>
